import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';

import { AppController } from './app.controller';
import { AuthenticationModule } from './authentication/authentication.module';
import { envValidation } from './config';
import { DatabaseModule } from './database/database.module';
import { EmailConfirmationModule } from './email-confirmation/email-confirmation.module';
import { GlobalExceptionFilter } from './filters';
import { GlobalResponseInterceptor } from './interceptors';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: envValidation,
      isGlobal: true,
    }),
    DatabaseModule,
    UsersModule,
    AuthenticationModule,
    EmailConfirmationModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: GlobalResponseInterceptor,
    },
  ],
})
export class AppModule {}
