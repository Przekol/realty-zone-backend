import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PasswordResetToken } from '@domain/reset-password/entities';
import { UsersModule } from '@domain/users';
import { EmailModule } from '@providers/email';
import { EventsModule } from '@providers/event-emitter/events.module';

import { PasswordResetController } from './password-reset.controller';
import { PasswordResetService } from './password-reset.service';

@Module({
  imports: [TypeOrmModule.forFeature([PasswordResetToken]), UsersModule, EmailModule, forwardRef(() => EventsModule)],
  controllers: [PasswordResetController],
  providers: [PasswordResetService],
  exports: [PasswordResetService],
})
export class PasswordResetModule {}
