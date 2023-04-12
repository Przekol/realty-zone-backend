import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

import { User } from '@api/users/entities';

import { MailTemplate } from '@types';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendMail(
    email: string,
    subject: string,
    template: string,
    context: {
      [name: string]: unknown;
    },
  ) {
    await this.mailerService.sendMail({
      to: email,
      subject: `Realty Zone - ${subject}`,
      template,
      context,
    });
  }

  async sendMessage(user: User, subject: string, template: MailTemplate) {
    await this.sendMail(user.email, subject, template, {
      username: user.email,
      title: subject,
    });
  }
}
