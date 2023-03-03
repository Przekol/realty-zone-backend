import { forwardRef, Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';

import { EmailConfirmationModule } from '@domain/email-confirmation';
import { PasswordResetModule } from '@domain/reset-password';
import { AuthenticationEmitter } from '@providers/event-emitter/emitters';
import { UserRegistrationEmitter } from '@providers/event-emitter/emitters/registration';
import { AuthenticationListener } from '@providers/event-emitter/listeners';
import { UserRegistrationListener } from '@providers/event-emitter/listeners/registration';

@Module({
  imports: [EventEmitterModule.forRoot(), EmailConfirmationModule, forwardRef(() => PasswordResetModule)],
  providers: [UserRegistrationListener, UserRegistrationEmitter, AuthenticationEmitter, AuthenticationListener],
  exports: [UserRegistrationEmitter, AuthenticationEmitter],
})
export class EventsModule {}
