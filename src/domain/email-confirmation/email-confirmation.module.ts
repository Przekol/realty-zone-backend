import { forwardRef, MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { ValidTokenMiddleware } from '@common/middlewares';
import { UsersModule } from '@domain/users';
import { EmailModule } from '@providers/email';
import { EventsModule } from '@providers/event-emitter/events.module';
import { TokensModule } from '@providers/tokens';

import { EmailConfirmationController } from './email-confirmation.controller';
import { EmailConfirmationService } from './email-confirmation.service';

@Module({
  imports: [forwardRef(() => EventsModule), EmailModule, JwtModule.register({}), UsersModule, TokensModule],
  providers: [EmailConfirmationService],
  controllers: [EmailConfirmationController],
  exports: [EmailConfirmationService],
})
export class EmailConfirmationModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ValidTokenMiddleware).forRoutes({ path: 'email-confirmation/confirm', method: RequestMethod.POST });
  }
}
