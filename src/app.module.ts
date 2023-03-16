import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';

import { ApiModule } from '@api/api.module';
import { GlobalExceptionFilter } from '@common/filters';
import { GlobalResponseInterceptor } from '@common/interceptors';
import { envValidationObjectSchema } from '@config';
import { DatabaseModule } from '@providers/database';
import { EventsModule } from '@providers/event-emitter/events.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: envValidationObjectSchema,
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
