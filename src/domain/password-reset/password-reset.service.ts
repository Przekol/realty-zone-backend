import { Injectable } from '@nestjs/common';

import { User } from '@domain/users/entities';
import { EmailService } from '@providers/email';

@Injectable()
export class PasswordResetService {
  constructor(private readonly emailService: EmailService) {}

  async sendPasswordResetConfirmation(user: User, subject: string) {
    await this.emailService.sendMail(user.email, subject, 'authentication/password-reset-success', {
      username: user.username,
      title: subject,
    });
  }
}
