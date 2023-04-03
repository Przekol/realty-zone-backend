import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { AuthenticationService } from '@api/authentication';
import { UnauthorizedAuthenticationTokenException } from '@common/exceptions';

import { TokenPayload } from '@types';

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(Strategy, 'jwt-refresh-token') {
  constructor(
    @Inject(ConfigService) private readonly configService: ConfigService,
    private readonly authenticationService: AuthenticationService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          if (!request?.cookies?.Refresh) {
            throw new UnauthorizedAuthenticationTokenException('NO_TOKEN');
          }
          return request?.cookies?.Refresh;
        },
      ]),
      secretOrKey: configService.get('JWT_SECRET_REFRESH_TOKEN'),
      passReqToCallback: true,
    });
  }

  async validate(request: Request, payload: TokenPayload) {
    try {
      if (!payload || !payload.userId || !payload.tokenType || payload.tokenType !== 'refresh') {
        new UnauthorizedAuthenticationTokenException('NO_TOKEN');
      }

      const refreshToken = request.cookies?.Refresh;
      return await this.authenticationService.getAuthenticatedUserByRefreshToken(refreshToken, payload);
    } catch (error) {
      throw new UnauthorizedAuthenticationTokenException('NO_TOKEN');
    }
  }
}
