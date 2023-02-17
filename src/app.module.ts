import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';

import { ApiModule } from './api';
import { GlobalExceptionFilter, GlobalResponseInterceptor } from './common';
import { envValidation } from './config';
import { DatabaseModule } from './providers';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: envValidation,
      isGlobal: true,
    }),
    DatabaseModule,
    ApiModule,
  ],
  controllers: [],
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
