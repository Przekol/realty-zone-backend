import { forwardRef, MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';

import { ValidTokenMiddleware } from '@common/middlewares';
import { UsersModule } from '@domain/users';
import { EventsModule } from '@providers/event-emitter';
import { TokensModule } from '@providers/tokens';

import { PasswordResetController } from './password-reset.controller';
import { PasswordResetService } from './password-reset.service';

@Module({
  imports: [UsersModule, forwardRef(() => EventsModule), TokensModule],
  controllers: [PasswordResetController],
  providers: [PasswordResetService],
  exports: [PasswordResetService],
})
export class PasswordResetModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ValidTokenMiddleware)
      .forRoutes(
        { path: 'password-reset', method: RequestMethod.POST },
        { path: 'password-reset/verify-password-reset-token', method: RequestMethod.GET },
      );
  }
}
