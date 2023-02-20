import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

import { events, VerificationLinkSendEvent } from '@providers/event-emitter/events';

@Injectable()
export class UserRegistrationEmitter {
  constructor(private readonly eventEmitter: EventEmitter2) {}

  async emitRegistrationVerificationLinkSendEvent(payload: VerificationLinkSendEvent): Promise<void> {
    const verificationLinkSendEvent = new VerificationLinkSendEvent();
    verificationLinkSendEvent.user = payload.user;
    verificationLinkSendEvent.subject = payload.subject;
    await this.eventEmitter.emitAsync(events.registrationVerificationLinkSend, verificationLinkSendEvent);
  }
}
