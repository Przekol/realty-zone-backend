import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DataSource, MoreThan } from 'typeorm';
import { v4 as uuid } from 'uuid';

import { PasswordResetToken } from '@domain/reset-password/entities';
import { User } from '@domain/users/entities';
import { EmailService } from '@providers/email';
import { hashData } from '@shared/utils';

@Injectable()
export class PasswordResetService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly configService: ConfigService,
    private readonly emailService: EmailService,
  ) {}

  async isResetTokenActiveForUser(user: User): Promise<boolean> {
    const resetToken = await PasswordResetToken.findOne({
      where: { user: { id: user.id }, isUsed: false, expiresIn: MoreThan(Date.now()) },
    });
    return !!resetToken;
  }

  async createPasswordResetToken(user: User): Promise<string> {
    const passwordResetToken = new PasswordResetToken();
    const token = await this.generateResetToken();
    passwordResetToken.hashToken = await hashData(token);
    passwordResetToken.user = user;
    await this.dataSource.manager.save(passwordResetToken);
    return token;
  }

  private async generateResetToken(): Promise<string> {
    return uuid();
  }

  async generateResetTokenLink(token: string, userId: string): Promise<string> {
    return `${this.configService.get('CLIENT_URL')}/reset-password?token=${token}&id=${userId}`;
  }

  async sendResetPasswordLink(user: User, subject: string) {
    const token = await this.createPasswordResetToken(user);
    const resetTokenLink = await this.generateResetTokenLink(token, user.id);

    await this.emailService.sendMail(user.email, subject, 'authentication/password-reset', {
      username: user.username,
      url: resetTokenLink,
      title: subject,
    });
  }
}
