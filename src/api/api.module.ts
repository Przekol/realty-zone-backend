import { Module } from '@nestjs/common';

import { AuthenticationModule } from '@domain/authentication/authentication.module';
import { EmailConfirmationModule } from '@domain/email-confirmation/email-confirmation.module';
import { UsersModule } from '@domain/users/users.module';

@Module({
  imports: [UsersModule, AuthenticationModule, EmailConfirmationModule],
})
export class ApiModule {}
