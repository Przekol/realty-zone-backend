import { forwardRef, Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';

import { EmailConfirmationModule } from '@domain/email-confirmation';
import { PasswordResetModule } from '@domain/password-reset';
import { AuthenticationEmitter } from '@providers/event-emitter/emitters';
import { AuthenticationListener } from '@providers/event-emitter/listeners';

@Module({
  imports: [EventEmitterModule.forRoot(), EmailConfirmationModule, forwardRef(() => PasswordResetModule)],
  providers: [AuthenticationEmitter, AuthenticationListener],
  exports: [AuthenticationEmitter],
})
export class EventsModule {}
