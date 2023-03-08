import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';

import { EmailModule } from '@providers/email';
import { AuthenticationEmitter } from '@providers/event-emitter/emitters';
import { AuthenticationListener } from '@providers/event-emitter/listeners';
import { TokensModule } from '@providers/tokens';

@Module({
  imports: [EventEmitterModule.forRoot(), TokensModule, EmailModule],
  providers: [AuthenticationEmitter, AuthenticationListener],
  exports: [AuthenticationEmitter],
})
export class EventsModule {}
