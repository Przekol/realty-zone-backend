import { Module } from '@nestjs/common';

import { AuthenticationModule } from '@api/authentication/authentication.module';
import { EmailConfirmationModule } from '@api/email-confirmation/email-confirmation.module';
import { PasswordResetModule } from '@api/password-reset/password-reset.module';
import { UsersModule } from '@api/users/users.module';

@Module({
  imports: [AuthenticationModule, EmailConfirmationModule, PasswordResetModule, UsersModule],
})
export class ApiModule {}
