import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { EmailConfirmationModule } from '@api/email-confirmation';
import { UsersModule } from '@api/users';
import { CookieModule } from '@providers/cookie';
import { EventsModule } from '@providers/event-emitter/events.module';
import { TokensModule } from '@providers/tokens';

import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { JwtRefreshTokenStrategy, JwtStrategy, LocalStrategy } from './strategies';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({}),
    EmailConfirmationModule,
    EventsModule,
    TokensModule,
    CookieModule,
  ],
  controllers: [AuthenticationController],
  providers: [AuthenticationService, LocalStrategy, JwtStrategy, JwtRefreshTokenStrategy],
})
export class AuthenticationModule {}
