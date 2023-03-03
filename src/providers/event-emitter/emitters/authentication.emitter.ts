import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

import { events } from '@providers/event-emitter/events';
import { LinkSendEmailAuthenticationEvent } from '@providers/event-emitter/events/authentication';

@Injectable()
export class AuthenticationEmitter {
  constructor(private readonly eventEmitter: EventEmitter2) {}

  async emitPasswordResetLinkSendEmailEvent(payload: LinkSendEmailAuthenticationEvent): Promise<void> {
    const passwordResetLinkSendEmailEvent = new LinkSendEmailAuthenticationEvent();
    passwordResetLinkSendEmailEvent.user = payload.user;
    passwordResetLinkSendEmailEvent.subject = payload.subject;
    passwordResetLinkSendEmailEvent.url = payload.url;
    await this.eventEmitter.emitAsync(events.authenticationSendEmailPasswordResetLink, passwordResetLinkSendEmailEvent);
  }
}
