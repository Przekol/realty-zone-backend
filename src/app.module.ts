import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';

import { GlobalExceptionFilter } from '@common/filters';
import { GlobalResponseInterceptor } from '@common/interceptors';
import { envValidation } from '@config';
import { ApiModule } from '@http/api';
import { DatabaseModule } from '@providers/database';
import { EventsModule } from '@providers/event-emitter/events.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: envValidation,
      isGlobal: true,
    }),
    DatabaseModule,
    ApiModule,
    EventsModule,
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
