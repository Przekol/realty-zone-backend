import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { VerificationTokenPayload } from './types';
import { EmailService } from '../email/email.service';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class EmailConfirmationService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly emailService: EmailService,
    private readonly usersService: UsersService,
  ) {}

  async sendVerificationLink(user: User) {
    const payload: VerificationTokenPayload = { email: user.email };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_SECRET_VERIFICATION_TOKEN'),
      expiresIn: this.configService.get('JWT_EXPIRATION_TIME_VERIFICATION_TOKEN'),
    });

    await this.usersService.setActivationToken(token, user);

    const url = `${this.configService.get('EMAIL_CONFIRMATION_URL')}?=token=${token}`;
    const text = `Welcome to the application. To confirm the email address, click here: ${url}`;

    return this.emailService.sendMail({
      to: user.email,
      subject: 'Email confirmation',
      text,
    });
  }
}
