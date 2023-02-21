import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import { EmailConfirmationService } from '@domain/email-confirmation';
import { events, VerificationLinkSendEvent } from '@providers/event-emitter/events';

@Injectable()
export class UserRegistrationListener {
  constructor(private readonly emailConfirmationService: EmailConfirmationService) {}

  @OnEvent(events.registrationVerificationLinkSend, { async: true })
  async handleRegistrationVerificationLinkSendEvent(payload: VerificationLinkSendEvent) {
    await this.emailConfirmationService.sendVerificationLink(payload.user, payload.subject);
  }
}
