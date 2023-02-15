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
      await this.verifyPassword(password, user.hashPwd);
      await this.verifyStatus(user.status);
      return user;
    } catch (error) {
      if (error instanceof UserLoginException) {
        throw error;
      }
      throw new UnauthorizedException('Wrong credentials provided');
    }
  }

  private async verifyPassword(password: string, hashedPassword: string): Promise<void> {
    const isPasswordMatching = await checkHash(password, hashedPassword);
    if (!isPasswordMatching) {
      throw new UnauthorizedException('Wrong credentials provided');
    }
  }

  getJwtToken(payload: TokenPayload, secret: string, expiresIn: number): string {
    return this.jwtService.sign(payload, { secret, expiresIn });
  }

  createAuthenticationsTokens(id: UserEntity['id']): AuthenticationsTokens {
    const expiresIn: Record<string, number> = {
      authenticationToken: this.configService.get('JWT_EXPIRATION_TIME_ACCESS'),
      refreshToken: this.configService.get('JWT_EXPIRATION_TIME_REFRESH'),
    };
    return {
      authenticationToken: {
        token: this.getJwtToken({ id }, this.configService.get('JWT_SECRET_ACCESS'), expiresIn.authenticationToken),
        expiresIn: expiresIn.authenticationToken,
      },
      refreshToken: {
        token: this.getJwtToken({ id }, this.configService.get('JWT_SECRET_REFRESH'), expiresIn.refreshToken),
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
