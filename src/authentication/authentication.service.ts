import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { RegisterDto } from './dto/register.dto';
import { AuthenticationsTokens, TokenPayload } from './types';
import { UserLoginException } from '../exceptions';
import { Status, UserEntity } from '../users/types';
import { UsersService } from '../users/users.service';
import { checkHash, hashData } from '../utils';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}
  async register(registrationData: RegisterDto): Promise<UserEntity> {
    const hashPwd = await hashData(registrationData.password);

    return await this.usersService.create({
      ...registrationData,
      hashPwd,
    });
  }
  async getAuthenticatedUser(email: string, password: string): Promise<UserEntity> {
    try {
      const user = await this.usersService.getByEmail(email);
      await this.verifyToken(password, user.hashPwd);
      await this.verifyStatus(user.status);
      return user;
    } catch (error) {
      if (error instanceof UserLoginException) {
        throw error;
      }
      throw new UnauthorizedException('Wrong credentials provided');
    }
  }

  async getAuthenticatedUserByAuthenticationToken(id: string): Promise<UserEntity> {
    const user = await this.usersService.getById(id);
    await this.verifyStatus(user.status);
    return user;
  }

  async getAuthenticatedUserByRefreshToken(refreshToken: string, id: string): Promise<UserEntity> {
    const user = await this.usersService.getById(id);
    await this.verifyToken(refreshToken, user.currentHashRefreshToken);
    await this.verifyStatus(user.status);
    return user;
  }

  private async verifyToken(data: string, hashedData: string): Promise<void> {
    const isTokenMatching = await checkHash(data, hashedData);
    if (!isTokenMatching) {
      throw new UnauthorizedException('Wrong credentials provided');
    }
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

  async verifyStatus(status: Status): Promise<void> {
    if (status !== Status.ACTIVE) {
      throw new UserLoginException(status);
    }
  }
}
