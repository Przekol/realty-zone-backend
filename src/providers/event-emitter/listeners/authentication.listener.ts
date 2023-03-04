import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import { EmailConfirmationService } from '@domain/email-confirmation';
import { PasswordResetService } from '@domain/reset-password';
import { events } from '@providers/event-emitter/events';
import { EmailSendLinkAuthenticationEvent } from '@providers/event-emitter/events/authentication';

@Injectable()
export class AuthenticationListener {
  constructor(
    private readonly emailConfirmationService: EmailConfirmationService,
    private readonly passwordResetService: PasswordResetService,
  ) {}

  @OnEvent(events.authenticationEmailSendActivationLink, { async: true })
  async handleVerificationLinkSendEmailEvent(payload: EmailSendLinkAuthenticationEvent) {
    await this.emailConfirmationService.sendVerificationLink(payload.user, payload.subject, payload.url);
  }

  @OnEvent(events.authenticationEmailSendPasswordResetLink, { async: true })
  async handlePasswordResetLinkSendEmailEvent(payload: EmailSendLinkAuthenticationEvent) {
    await this.passwordResetService.sendResetPasswordLink(payload.user, payload.subject, payload.url);
  }
}
