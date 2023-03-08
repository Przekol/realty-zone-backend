import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import { EmailService } from '@providers/email';
import { events } from '@providers/event-emitter/events';
import {
  EmailSendLinkAuthenticationEvent,
  EmailSendMessageEvent,
} from '@providers/event-emitter/events/authentication';
import { TokensService } from '@providers/tokens';

@Injectable()
export class AuthenticationListener {
  constructor(private readonly tokensService: TokensService, private readonly emailService: EmailService) {}

  @OnEvent(events.authenticationEmailSendActivationLink, { async: true })
  async handleEmailActivationLinkSendEvent(payload: EmailSendLinkAuthenticationEvent) {
    await this.tokensService.sendTokenLink(payload.user, payload.subject, payload.url, payload.template);
  }

  @OnEvent(events.authenticationEmailSendPasswordResetLink, { async: true })
  async handleEmailPasswordResetLinkSendEvent(payload: EmailSendLinkAuthenticationEvent) {
    await this.tokensService.sendTokenLink(payload.user, payload.subject, payload.url, payload.template);
  }

  @OnEvent(events.authenticationEmailSendPasswordResetConfirmation, { async: true })
  async handleEmailMessageSendEvent(payload: EmailSendMessageEvent) {
    await this.emailService.sendMessage(payload.user, payload.subject, payload.template);
  }
}
