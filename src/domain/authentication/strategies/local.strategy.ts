import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

import { AuthenticationService } from '@domain/authentication';

import { UserEntity } from '@domain/users/types';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authenticationService: AuthenticationService) {
    super({
      usernameField: 'email',
    });
  }
  async validate(email: string, password: string): Promise<UserEntity> {
    return this.authenticationService.getAuthenticatedUser(email, password);
  }
}
