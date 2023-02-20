import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';

import { EmailConfirmationModule } from '@domain/email-confirmation';
import { UserRegistrationEmitter } from '@providers/event-emitter/emitters/registration';
import { UserRegistrationListener } from '@providers/event-emitter/listeners/registration';

@Module({
  imports: [EventEmitterModule.forRoot(), EmailConfirmationModule],
  providers: [UserRegistrationListener, UserRegistrationEmitter],
  exports: [UserRegistrationEmitter],
})
export class EventsModule {}
