import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from '@domain/users';
import { User } from '@domain/users/entities';
import { EmailService } from '@providers/email';
import { AuthenticationEmitter } from '@providers/event-emitter/emitters';

import { VerificationTokenPayload } from './types';
import { Status } from '@domain/users/types';

@Injectable()
export class EmailConfirmationService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly emailService: EmailService,
    private readonly usersService: UsersService,
    private readonly authenticationEmitter: AuthenticationEmitter,
  ) {}

  async sendVerificationLink(user: User, subject: string, url: string) {
    await this.emailService.sendMail(user.email, subject, 'authentication/email-confirmation', {
      username: user.username,
      url,
      title: subject,
    });
  }

  async generateActivationLink(user: User): Promise<string> {
    const payload: VerificationTokenPayload = { email: user.email };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_SECRET_VERIFICATION_TOKEN'),
      expiresIn: this.configService.get('JWT_EXPIRATION_TIME_VERIFICATION_TOKEN'),
    });

    await this.usersService.setHashToken(token, user, { tokenType: 'activation' });

    return `${this.configService.get('EMAIL_CONFIRMATION_URL')}?token=${token}`;
  }

  async decodeConfirmationToken(token: string) {
    try {
      const payload: VerificationTokenPayload = await this.jwtService.verify(token, {
        secret: this.configService.get('JWT_SECRET_VERIFICATION_TOKEN'),
      });

      if (!payload || !payload.email) {
        throw new BadRequestException('Bad confirmation token');
      }

      const user = await this.usersService.getByEmail(payload.email);
      if (user.status === Status.ACTIVE) {
        throw new BadRequestException('Email already confirmed');
      }

      await this.usersService.verifyToken(
        token,
        user.activationHashToken || '',
        new BadRequestException('Bad confirmation token'),
      );

      return payload.email;
    } catch (error) {
      if (error?.name === 'TokenExpiredError') {
        throw new BadRequestException('Email confirmation token expired');
      }
      throw error;
    }
  }

  async confirmEmail(email: string) {
    const user = await this.usersService.getByEmail(email);
    await this.usersService.updateUserStatus(user, Status.ACTIVE);
    await this.usersService.removeHashToken(user, { tokenType: 'activation' });
  }

  async resendConfirmationLink(user: User, url: string) {
    await this.authenticationEmitter.emitActivationEmailSendEvent({
      user,
      subject: 'Ponowne potwierdzenie rejestracji',
      url,
    });
  }
}
