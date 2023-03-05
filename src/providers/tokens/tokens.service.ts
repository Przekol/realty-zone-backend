import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DataSource, MoreThan } from 'typeorm';
import { v4 as uuid } from 'uuid';

import { User } from '@domain/users/entities';
import { EmailService } from '@providers/email';
import { ActivationToken, PasswordResetToken } from '@providers/tokens/entities';
import { checkHash, hashData } from '@shared/utils';

import { MailTemplate } from '@providers/email/types';
import { TokenOptions, TokenType } from '@providers/tokens/types';

@Injectable()
export class TokensService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly configService: ConfigService,
    private readonly emailService: EmailService,
  ) {}

  async createToken(user: User, options: TokenOptions): Promise<string> {
    let tokenEntity: ActivationToken | PasswordResetToken;
    const { tokenType } = options;

    switch (tokenType) {
      case 'activation':
        tokenEntity = new ActivationToken();
        break;
      case 'password-reset':
        tokenEntity = new PasswordResetToken();
        break;
      default:
        throw new BadRequestException('Invalid token type');
    }
    const token = await this.generateToken();
    tokenEntity.hashToken = await hashData(token);
    tokenEntity.user = user;
    await this.dataSource.manager.save(tokenEntity);
    return token;
  }

  private async generateToken(): Promise<string> {
    return uuid();
  }

  async generateTokenLink(token: string, userId: string, options: TokenOptions): Promise<string> {
    const { tokenType } = options;
    switch (tokenType) {
      case 'activation':
        return `${this.configService.get('CLIENT_URL')}/confirm-email?token=${token}&id=${userId}`;
      case 'password-reset':
        return `${this.configService.get('CLIENT_URL')}/reset-password?token=${token}&id=${userId}`;
      default:
        throw new BadRequestException('Invalid token type');
    }
  }

  async verifyToken(data: string, hashedData: string, exception: HttpException): Promise<void> {
    const isTokenMatching = await checkHash(data, hashedData);
    if (!isTokenMatching) {
      throw exception;
    }
  }

  async markTokenAsUsed(token: TokenType): Promise<void> {
    token.isUsed = true;
    await token.save();
  }

  async getTokenActiveByUserId(userId: string, options: TokenOptions): Promise<PasswordResetToken | ActivationToken> {
    const { tokenType } = options;
    const queryOptions = {
      where: { user: { id: userId }, isUsed: false, expiresIn: MoreThan(Date.now()) },
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
}
