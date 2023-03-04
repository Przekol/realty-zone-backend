import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import { EmailConfirmationService } from '@domain/email-confirmation';
import { PasswordResetService } from '@domain/password-reset';
import { events } from '@providers/event-emitter/events';
import {
  EmailSendLinkAuthenticationEvent,
  EmailSendConfirmationEvent,
} from '@providers/event-emitter/events/authentication';

@Injectable()
export class AuthenticationListener {
  constructor(
    private readonly emailConfirmationService: EmailConfirmationService,
    private readonly passwordResetService: PasswordResetService,
  ) {}

  @OnEvent(events.authenticationEmailSendActivationLink, { async: true })
  async handleEmailActivationLinkSendEvent(payload: EmailSendLinkAuthenticationEvent) {
    await this.emailConfirmationService.sendActivationLink(payload.user, payload.subject, payload.url);
  }

  @OnEvent(events.authenticationEmailSendPasswordResetLink, { async: true })
  async handleEmailPasswordResetLinkSendEvent(payload: EmailSendLinkAuthenticationEvent) {
    await this.passwordResetService.sendPasswordResetLink(payload.user, payload.subject, payload.url);
  }

  @OnEvent(events.authenticationEmailSendPasswordResetConfirmation, { async: true })
  async handlePasswordResetConfirmationSendEvent(payload: EmailSendConfirmationEvent) {
    await this.passwordResetService.sendPasswordResetConfirmation(payload.user, payload.subject);
  }
}
