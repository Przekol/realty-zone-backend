import { Injectable } from '@nestjs/common';

import { User } from '@domain/users/entities';
import { EmailService } from '@providers/email';

import { MailTemplate } from '@providers/email/types';

@Injectable()
export class PasswordResetService {
  constructor(private readonly emailService: EmailService) {}

  async sendPasswordResetConfirmation(user: User, subject: string, template: MailTemplate) {
    await this.emailService.sendMail(user.email, subject, template, {
      username: user.username,
      title: subject,
    });
  }
}
