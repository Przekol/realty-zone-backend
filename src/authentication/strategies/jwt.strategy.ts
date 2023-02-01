import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { TokenPayload } from '../../../@types';
import { UsersService } from '../../users/users.service';
import { Inject, UnauthorizedException } from '@nestjs/common';

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(ConfigService) private readonly configService: ConfigService,
    private readonly usersService: UsersService,
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
  async validate(payload: TokenPayload) {
    try {
      if (!payload || !payload.id) {
        new UnauthorizedException('Wrong credentials provided');
      }
      return await this.usersService.getById(payload.id);
    } catch (error) {
      throw new UnauthorizedException('Wrong credentials provided');
    }
  }
}
