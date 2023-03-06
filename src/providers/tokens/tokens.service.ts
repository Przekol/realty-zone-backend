import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { DataSource, MoreThan } from 'typeorm';

import { User } from '@domain/users/entities';
import { EmailService } from '@providers/email';
import { ActivationToken, PasswordResetToken } from '@providers/tokens/entities';
import { checkHash, hashData } from '@shared/utils';

import { MailTemplate } from '@providers/email/types';
import { TokenOptions, TokenPayload, TokenEntityType } from '@providers/tokens/types';

@Injectable()
export class TokensService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly configService: ConfigService,
    private readonly emailService: EmailService,
    private readonly jwtService: JwtService,
  ) {}

  async createToken(user: User, options: TokenOptions): Promise<string> {
    let tokenEntity: ActivationToken | PasswordResetToken;
    let token: string;
    const { tokenType } = options;

    switch (tokenType) {
      case 'activation':
        tokenEntity = new ActivationToken();
        token = await this.generateToken(user.id, tokenType);
        break;
      case 'password-reset':
        tokenEntity = new PasswordResetToken();
        token = await this.generateToken(user.id, tokenType);
        break;
      default:
        throw new BadRequestException('Invalid token type');
    }

    tokenEntity.hashToken = await hashData(token);
    tokenEntity.user = user;
    await this.dataSource.manager.save(tokenEntity);
    return token;
  }

  private async generateToken(userId: string, tokenType: TokenOptions['tokenType']): Promise<string> {
    const payload: TokenPayload = { userId, tokenType };

    return this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_SECRET_TOKEN'),
      expiresIn: this.configService.get('JWT_EXPIRATION_TOKEN'),
    });
  }

  async generateTokenLink(token: string, options: TokenOptions): Promise<string> {
    const { tokenType } = options;

    return `${this.configService.get('CLIENT_URL')}/${tokenType}?token=${token}`;
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

  async decodeToken(token: string) {
    try {
      const payload: TokenPayload = await this.jwtService.verify(token, {
        secret: this.configService.get('JWT_SECRET_TOKEN'),
      });

      if (!payload || !payload.userId || !payload.tokenType) {
        throw new UnauthorizedException('Invalid or expired token');
      }

      return { userId: payload.userId, tokenType: payload.tokenType };
    } catch (error) {
      // error?.name;
      throw new UnauthorizedException('Invalid or expired token!');
    }
  }
}
