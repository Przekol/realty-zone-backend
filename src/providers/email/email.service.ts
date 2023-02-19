import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

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
}
