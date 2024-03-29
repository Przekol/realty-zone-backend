import { Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { AuthenticationService } from '@api/authentication';
import { UnauthorizedAuthenticationTokenException } from '@common/exceptions';

import { TokenPayload } from '@types';

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(ConfigService) private readonly configService: ConfigService,
    private readonly authenticationService: AuthenticationService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          if (!request?.cookies?.Authentication) {
            throw new UnauthorizedAuthenticationTokenException('TOKEN_EXPIRED');
          }
          return request?.cookies?.Authentication;
        },
      ]),
      secretOrKey: configService.get('JWT_SECRET_AUTHENTICATION_TOKEN'),
    });
  }
  async validate(payload: TokenPayload) {
    try {
      if (!payload || !payload.userId || !payload.tokenType || payload.tokenType !== 'authentication') {
        new UnauthorizedAuthenticationTokenException('TOKEN_EXPIRED');
      }
      return await this.authenticationService.getAuthenticatedUserByAuthenticationToken(payload.userId);
    } catch (error) {
      throw new UnauthorizedAuthenticationTokenException('TOKEN_EXPIRED');
    }
  }
}
