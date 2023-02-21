import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { UsersModule } from '@domain/users';
import { EmailModule } from '@providers/email';
import { EventsModule } from '@providers/event-emitter/events.module';

import { EmailConfirmationController } from './email-confirmation.controller';
import { EmailConfirmationService } from './email-confirmation.service';

@Module({
  imports: [forwardRef(() => EventsModule), EmailModule, JwtModule.register({}), UsersModule],
  providers: [EmailConfirmationService],
  exports: [EmailConfirmationService],
  controllers: [EmailConfirmationController],
})
export class EmailConfirmationModule {}
