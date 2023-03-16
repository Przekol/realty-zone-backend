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
    return `${this.configService.get('CLIENT_URL')}/${path}?type=${tokenType}?token=${token}`;
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
        secret = this.configService.get('JWT_SECRET_TOKEN_ACTIVATION');
        expiresIn = this.configService.get('JWT_EXPIRATION_TOKEN_ACTIVATION');
        break;
      case 'password-reset':
        secret = this.configService.get('JWT_SECRET_TOKEN_PASSWORD_RESET');
        expiresIn = this.configService.get('JWT_EXPIRATION_TOKEN_PASSWORD_RESET');
        break;
      case 'refresh':
        secret = this.configService.get('JWT_SECRET_REFRESH_TOKEN');
        expiresIn = this.configService.get('JWT_EXPIRATION_TIME_REFRESH_TOKEN');
        break;
      case 'authentication':
        secret = this.configService.get('JWT_SECRET_AUTHENTICATION_TOKEN');
        expiresIn = this.configService.get('JWT_EXPIRATION_TIME_AUTHENTICATION_TOKEN');
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
