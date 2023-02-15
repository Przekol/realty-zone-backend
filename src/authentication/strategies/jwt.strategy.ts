import { Inject, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { UserLoginException } from '../../exceptions';
import { UsersService } from '../../users/users.service';
import { AuthenticationService } from '../authentication.service';
import { AuthenticationTokenPayload } from '../types';

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(ConfigService) private readonly configService: ConfigService,
    private readonly usersService: UsersService,
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
      secretOrKey: configService.get('JWT_SECRET_ACCESS'),
    });
  }
  async validate(payload: AuthenticationTokenPayload) {
    try {
      if (!payload || !payload.id) {
        new UnauthorizedException('Wrong credentials provided');
      }
      const user = await this.usersService.getById(payload.id);
      await this.authenticationService.verifyStatus(user.status);
      return user;
    } catch (error) {
      if (error instanceof UserLoginException) {
        throw error;
      }
      throw new UnauthorizedException('Wrong credentials provided');
    }
  }
}
