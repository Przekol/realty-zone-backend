import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PasswordResetToken } from '@domain/reset-password/entities/password-reset-token.entity';
import { UsersModule } from '@domain/users';
import { EmailModule } from '@providers/email';

import { PasswordResetController } from './password-reset.controller';
import { PasswordResetService } from './password-reset.service';

@Module({
  imports: [TypeOrmModule.forFeature([PasswordResetToken]), UsersModule, EmailModule],
  controllers: [PasswordResetController],
  providers: [PasswordResetService],
})
export class PasswordResetModule {}
