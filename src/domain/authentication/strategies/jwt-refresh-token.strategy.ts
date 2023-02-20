import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { AuthenticationService } from '@domain/authentication';

import { AuthenticationTokenPayload } from '@domain/authentication/types';

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(Strategy, 'jwt-refresh-token') {
  constructor(
    @Inject(ConfigService) private readonly configService: ConfigService,
    private authenticationService: AuthenticationService,
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

  async validate(request: Request, payload: AuthenticationTokenPayload) {
    try {
      if (!payload || !payload.id) {
        new UnauthorizedException('Wrong credentials provided');
      }

      const refreshToken = request.cookies?.Refresh;
      return await this.authenticationService.getAuthenticatedUserByRefreshToken(refreshToken, payload.id);
    } catch (error) {
      throw new UnauthorizedException('Wrong credentials provided');
    }
  }
}