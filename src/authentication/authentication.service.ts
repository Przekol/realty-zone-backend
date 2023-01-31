import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { checkHash, hashData } from '../utils';
import { JwtPayload, UserEntity } from '../../@types';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthenticationService {
  constructor(private readonly usersService: UsersService, private readonly jwtService: JwtService) {}
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
      return user;
    } catch (error) {
      throw new UnauthorizedException('Wrong credentials provided');
    }
  }

  private async verifyPassword(password: string, hashedPassword: string): Promise<void> {
    const isPasswordMatching = await checkHash(password, hashedPassword);
    if (!isPasswordMatching) {
      throw new UnauthorizedException('Wrong credentials provided');
    }
  }

  getJwtToken(payload: JwtPayload, secret: string, expiresIn: number): string {
    return this.jwtService.sign(payload, { secret, expiresIn });
  }
}
