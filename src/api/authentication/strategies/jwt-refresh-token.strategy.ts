import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { AuthenticationService } from '@api/authentication';

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
            throw new UnauthorizedException('Wrong credentials provided');
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
        new UnauthorizedException('Wrong credentials provided');
      }

      const refreshToken = request.cookies?.Refresh;
      return await this.authenticationService.getAuthenticatedUserByRefreshToken(refreshToken, payload);
    } catch (error) {
      throw new UnauthorizedException('Wrong credentials provided');
    }
  }
}
