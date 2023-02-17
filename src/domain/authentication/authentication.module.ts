import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { EmailConfirmationModule } from '@domain/email-confirmation';
import { UsersModule } from '@domain/users';

import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { CookieService } from './cookie.service';
import { JwtRefreshTokenStrategy, JwtStrategy, LocalStrategy } from './strategies';

@Module({
  imports: [UsersModule, PassportModule, JwtModule.register({}), EmailConfirmationModule],
  controllers: [AuthenticationController],
  providers: [AuthenticationService, LocalStrategy, CookieService, JwtStrategy, JwtRefreshTokenStrategy],
})
export class AuthenticationModule {}
