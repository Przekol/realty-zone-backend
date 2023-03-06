import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

import { events } from '@providers/event-emitter/events';
import {
  EmailSendConfirmationEvent,
  EmailSendLinkAuthenticationEvent,
} from '@providers/event-emitter/events/authentication';

@Injectable()
export class AuthenticationEmitter {
  constructor(private readonly eventEmitter: EventEmitter2) {}

  async emitActivationEmailSendEvent(payload: EmailSendLinkAuthenticationEvent) {
    const activationEmailSendEvent = new EmailSendLinkAuthenticationEvent();
    activationEmailSendEvent.user = payload.user;
    activationEmailSendEvent.subject = payload.subject;
    activationEmailSendEvent.url = payload.url;
    activationEmailSendEvent.template = payload.template;

    await this.eventEmitter.emitAsync(events.authenticationEmailSendActivationLink, activationEmailSendEvent);
  }

  async emitPasswordResetEmailSendEvent(payload: EmailSendLinkAuthenticationEvent): Promise<void> {
    const passwordResetEmailSendEvent = new EmailSendLinkAuthenticationEvent();
    passwordResetEmailSendEvent.user = payload.user;
    passwordResetEmailSendEvent.subject = payload.subject;
    passwordResetEmailSendEvent.url = payload.url;
    passwordResetEmailSendEvent.template = payload.template;

    await this.eventEmitter.emitAsync(events.authenticationEmailSendPasswordResetLink, passwordResetEmailSendEvent);
  }

  async emitConfirmationEmailSendEvent(payload: EmailSendConfirmationEvent): Promise<void> {
    const confirmationEmailSentEvent = new EmailSendConfirmationEvent();
    confirmationEmailSentEvent.user = payload.user;
    confirmationEmailSentEvent.subject = payload.subject;
    confirmationEmailSentEvent.template = payload.template;

    await this.eventEmitter.emitAsync(
      events.authenticationEmailSendPasswordResetConfirmation,
      confirmationEmailSentEvent,
    );
  }
}
