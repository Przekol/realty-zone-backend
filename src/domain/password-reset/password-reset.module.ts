import { forwardRef, MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';

import { ValidPasswordResetTokenMiddleware } from '@common/middlewares';
import { UsersModule } from '@domain/users';
import { EmailModule } from '@providers/email';
import { EventsModule } from '@providers/event-emitter';

import { PasswordResetController } from './password-reset.controller';
import { PasswordResetService } from './password-reset.service';

@Module({
  imports: [UsersModule, EmailModule, forwardRef(() => EventsModule)],
  controllers: [PasswordResetController],
  providers: [PasswordResetService],
  exports: [PasswordResetService],
})
export class PasswordResetModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ValidPasswordResetTokenMiddleware)
      .forRoutes(
        { path: 'password-reset', method: RequestMethod.POST },
        { path: 'password-reset/verify-password-reset-token', method: RequestMethod.GET },
      );
  }
}