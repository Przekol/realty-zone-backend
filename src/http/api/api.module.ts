import { Module } from '@nestjs/common';

import { AuthenticationModule } from '@http/authentication/authentication.module';
import { EmailConfirmationModule } from '@http/email-confirmation/email-confirmation.module';
import { PasswordResetModule } from '@http/password-reset/password-reset.module';
import { UsersModule } from '@http/users/users.module';

@Module({
  imports: [AuthenticationModule, EmailConfirmationModule, PasswordResetModule, UsersModule],
})
export class ApiModule {}
