import { Inject, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { UserLoginException } from '../../exceptions';
import { AuthenticationService } from '../authentication.service';
import { TokenPayload } from '../types';

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(ConfigService) private readonly configService: ConfigService,
    private authenticationService: AuthenticationService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          if (!request?.cookies?.Authentication) {
            throw new UnauthorizedException('Wrong credentials provided');
          }
          return request?.cookies?.Authentication;
        },
      ]),
      secretOrKey: configService.get('JWT_SECRET_AUTHENTICATION_TOKEN'),
    });
  }
  async validate(payload: TokenPayload) {
    try {
      if (!payload || !payload.id) {
        new UnauthorizedException('Wrong credentials provided');
      }
      return await this.authenticationService.getAuthenticatedUserByAuthenticationToken(payload.id);
    } catch (error) {
      if (error instanceof UserLoginException) {
        throw error;
      } else {
        throw new UnauthorizedException('Wrong credentials provided');
      }
    }
  }
}
