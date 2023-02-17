import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from '@domain/users';
import { User } from '@domain/users/entities';
import { hashData } from '@shared/utils';

import { AuthenticationsTokens, TokenPayload } from './types';
import { UserEntity } from '@domain/users/types';

import { RegisterDto } from './dto';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}
  async register(registrationData: RegisterDto): Promise<User> {
    const hashPwd = await hashData(registrationData.password);

    return await this.usersService.create({
      ...registrationData,
      hashPwd,
    });
  }
  async getAuthenticatedUser(email: string, password: string): Promise<UserEntity> {
    try {
      const user = await this.usersService.getByEmail(email);
      await this.usersService.verifyToken(
        password,
        user.hashPwd,
        new UnauthorizedException('Wrong credentials provided'),
      );

      return user;
    } catch (error) {
      throw new UnauthorizedException('Wrong credentials provided');
    }
  }

  async getAuthenticatedUserByAuthenticationToken(id: string): Promise<UserEntity> {
    return await this.usersService.getById(id);
  }

  async getAuthenticatedUserByRefreshToken(refreshToken: string, id: string): Promise<UserEntity> {
    const user = await this.usersService.getById(id);
    await this.usersService.verifyToken(
      refreshToken,
      user.currentHashRefreshToken,
      new UnauthorizedException('Wrong credentials provided'),
    );
    return user;
  }

  getJwtToken(payload: TokenPayload, secret: string, expiresIn: number): string {
    return this.jwtService.sign(payload, { secret, expiresIn });
  }

  createAuthenticationsTokens(id: UserEntity['id']): AuthenticationsTokens {
    const expiresIn: Record<string, number> = {
      authenticationToken: this.configService.get('JWT_EXPIRATION_TIME_AUTHENTICATION_TOKEN'),
      refreshToken: this.configService.get('JWT_EXPIRATION_TIME_REFRESH_TOKEN'),
    };
    return {
      authenticationToken: {
        token: this.getJwtToken(
          { id },
          this.configService.get('JWT_SECRET_AUTHENTICATION_TOKEN'),
          expiresIn.authenticationToken,
        ),
        expiresIn: expiresIn.authenticationToken,
      },
      refreshToken: {
        token: this.getJwtToken({ id }, this.configService.get('JWT_SECRET_REFRESH_TOKEN'), expiresIn.refreshToken),
        expiresIn: expiresIn.refreshToken,
      },
    };
  }
}
