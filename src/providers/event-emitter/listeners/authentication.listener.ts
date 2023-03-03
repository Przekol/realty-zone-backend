import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import { EmailConfirmationService } from '@domain/email-confirmation';
import { PasswordResetService } from '@domain/reset-password';
import { events } from '@providers/event-emitter/events';
import { LinkSendEmailAuthenticationEvent } from '@providers/event-emitter/events/authentication';

@Injectable()
export class AuthenticationListener {
  constructor(
    private readonly emailConfirmationService: EmailConfirmationService,
    private readonly passwordResetService: PasswordResetService,
  ) {}

  @OnEvent(events.authenticationSendEmailActivationLink, { async: true })
  async handleVerificationLinkSendEmailEvent(payload: LinkSendEmailAuthenticationEvent) {
    await this.emailConfirmationService.sendVerificationLink(payload.user, payload.subject, payload.url);
  }

  @OnEvent(events.authenticationSendEmailPasswordResetLink, { async: true })
  async handlePasswordResetLinkSendEmailEvent(payload: LinkSendEmailAuthenticationEvent) {
    await this.passwordResetService.sendResetPasswordLink(payload.user, payload.subject, payload.url);
  }
}
