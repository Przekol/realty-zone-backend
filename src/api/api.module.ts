import { Module } from '@nestjs/common';

import { AuthenticationModule, EmailConfirmationModule, UsersModule } from '../domain';

@Module({
  imports: [UsersModule, AuthenticationModule, EmailConfirmationModule],
})
export class ApiModule {}
