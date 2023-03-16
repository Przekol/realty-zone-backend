import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { DataSource, MoreThan } from 'typeorm';

import { User } from '@api/users/entities';
import { EmailService } from '@providers/email';
import { ActivationToken, PasswordResetToken, RefreshToken } from '@providers/tokens/entities';
import { checkHash, hashData } from '@shared/utils';

import {
  JwtTokenOptions,
  MailTemplate,
  TokenData,
  TokenEntityType,
  TokenOptions,
  TokenPayload,
  ValidTokenRequest,
} from '@types';

@Injectable()
export class TokensService {
  private readonly jwtSecretActivationToken = this.configService.get<string>('JWT_SECRET_ACTIVATION_TOKEN');
  private readonly jwtExpirationTimeActivationToken = this.configService.get<number>(
    'JWT_EXPIRATION_TIME_ACTIVATION_TOKEN',
  );
  private readonly jwtSecretPasswordResetToken = this.configService.get<string>('JWT_SECRET_PASSWORD_RESET_TOKEN');
  private readonly jwtExpirationTimePasswordResetToken = this.configService.get<number>(
    'JWT_EXPIRATION_TIME_PASSWORD_RESET_TOKEN',
  );
  private readonly jwtSecretRefreshToken = this.configService.get<string>('JWT_SECRET_REFRESH_TOKEN');
  private readonly jwtExpirationTimeRefreshToken = this.configService.get<number>('JWT_EXPIRATION_TIME_REFRESH_TOKEN');
  private readonly jwtSecretAuthenticationToken = this.configService.get<string>('JWT_SECRET_AUTHENTICATION_TOKEN');
  private readonly jwtExpirationTimeAuthenticationToken = this.configService.get<number>(
    'JWT_EXPIRATION_TIME_AUTHENTICATION_TOKEN',
  );
  private readonly clientUrl = this.configService.get<string>('CLIENT_URL');

  constructor(
    private readonly dataSource: DataSource,
    private readonly configService: ConfigService,
    private readonly emailService: EmailService,
    private readonly jwtService: JwtService,
  ) {}

  async createToken(user: User, options: TokenOptions): Promise<TokenData> {
    let tokenEntity: TokenEntityType;
    let tokenData: TokenData;

    const { tokenType } = options;

    switch (tokenType) {
      case 'activation':
        tokenEntity = new ActivationToken();
        tokenData = await this.generateToken(user.id, tokenType);
        break;
      case 'password-reset':
        tokenEntity = new PasswordResetToken();
        tokenData = await this.generateToken(user.id, tokenType);
        break;
      case 'refresh':
        tokenEntity = new RefreshToken();
        tokenData = await this.generateToken(user.id, tokenType);
        break;
      case 'authentication':
        tokenData = await this.generateToken(user.id, tokenType);
        break;
      default:
        throw new BadRequestException('Invalid token type');
    }
    if (tokenType !== 'authentication') {
      await this.saveTokenInDatabase(tokenEntity, tokenData.token, user);
    }
    return tokenData;
  }

  private async saveTokenInDatabase(tokenEntity: TokenEntityType, token: string, user: User) {
    tokenEntity.hashToken = await hashData(token);
    tokenEntity.user = user;
    await this.dataSource.manager.save(tokenEntity);
  }

  private async generateToken(userId: string, tokenType: TokenOptions['tokenType']): Promise<TokenData> {
    const payload: TokenPayload = { userId, tokenType };
    const { secret, expiresIn } = this.getJwtTokenOptionsByType(tokenType);
    const token = this.jwtService.sign(payload, {
      secret,
      expiresIn,
    });

    return {
      token,
      expiresIn,
    };
  }

  async generateTokenLink(token: string, options: TokenOptions): Promise<string> {
    const { tokenType } = options;
    let path: string;
    switch (tokenType) {
      case 'activation':
        path = 'activate-account';
        break;
      case 'password-reset':
        path = 'change-password';
        break;

      default:
        throw new BadRequestException('Invalid token type');
    }
    return `${this.clientUrl}/${path}?type=${tokenType}?token=${token}`;
  }

  async verifyToken(data: string, hashedData: string): Promise<void> {
    try {
      const isTokenMatching = await checkHash(data, hashedData);
      if (!isTokenMatching) {
        throw new UnauthorizedException('Invalid or expired token!');
      }
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token!');
    }
  }

  async markTokenAsUsed(token: TokenEntityType): Promise<void> {
    token.isUsed = true;
    await token.save();
  }

  async getTokenActiveByUserId(userId: string, options: TokenOptions): Promise<TokenEntityType> {
    const { tokenType } = options;
    const queryOptions = {
      where: { user: { id: userId }, isUsed: false, expiresIn: MoreThan(Date.now()) },
      relations: { user: true },
      select: {
        id: true,
        hashToken: true,
        isUsed: true,
        expiresIn: true,
        user: {
          id: true,
        },
      },
    };
    switch (tokenType) {
      case 'activation':
        return ActivationToken.findOne(queryOptions);
      case 'password-reset':
        return PasswordResetToken.findOne(queryOptions);
      case 'refresh':
        return RefreshToken.findOne(queryOptions);
      default:
        throw new BadRequestException('Invalid token type');
    }
  }

  async sendTokenLink(user: User, subject: string, url: string, template: MailTemplate) {
    await this.emailService.sendMail(user.email, subject, template, {
      username: user.username,
      url,
      title: subject,
    });
  }

  async decodeToken({ type, token }: ValidTokenRequest) {
    try {
      const payload: TokenPayload = await this.jwtService.verify(token, {
        secret: this.getJwtTokenOptionsByType(type).secret,
      });

      if (!payload || !payload.userId || !payload.tokenType || payload.tokenType !== type) {
        throw new UnauthorizedException('Invalid or expired token');
      }

      return { userId: payload.userId, tokenType: payload.tokenType };
    } catch (error) {
      // error?.name;
      throw new UnauthorizedException('Invalid or expired token!');
    }
  }

  private getJwtTokenOptionsByType(tokenType: TokenOptions['tokenType']): JwtTokenOptions {
    let secret: string, expiresIn: number;
    switch (tokenType) {
      case 'activation':
        secret = this.jwtSecretActivationToken;
        expiresIn = this.jwtExpirationTimeActivationToken;
        break;
      case 'password-reset':
        secret = this.jwtSecretPasswordResetToken;
        expiresIn = this.jwtExpirationTimePasswordResetToken;
        break;
      case 'refresh':
        secret = this.jwtSecretRefreshToken;
        expiresIn = this.jwtExpirationTimeRefreshToken;
        break;
      case 'authentication':
        secret = this.jwtSecretAuthenticationToken;
        expiresIn = this.jwtExpirationTimeAuthenticationToken;
        break;
      default:
        throw new BadRequestException('Invalid token type');
    }

    return { secret, expiresIn };
  }

  async revokeActiveRefreshToken(userId: string) {
    const refreshTokenActive = await this.getTokenActiveByUserId(userId, { tokenType: 'refresh' });
    if (refreshTokenActive) {
      await this.markTokenAsUsed(refreshTokenActive);
    }
  }
}
