import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import { PasswordResetService } from '@domain/reset-password';
import { events } from '@providers/event-emitter/events';
import { LinkSendEmailAuthenticationEvent } from '@providers/event-emitter/events/authentication';

@Injectable()
export class AuthenticationListener {
  constructor(private readonly passwordResetService: PasswordResetService) {}

  @OnEvent(events.authenticationSendEmailPasswordResetLink, { async: true })
  async handlePasswordResetLinkSendEmailEvent(payload: LinkSendEmailAuthenticationEvent) {
    await this.passwordResetService.sendResetPasswordLink(payload.user, payload.subject, payload.url);
  }
}
