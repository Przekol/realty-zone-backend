import { BadRequestException, HttpException, Injectable } from '@nestjs/common';

import { checkHash, hashData } from '@shared/utils';

import { OptionsHashToken, Status } from './types';

import { CreateUserDto } from './dto';
import { User } from './entities';

@Injectable()
export class UsersService {
  async getByEmail(email: string): Promise<User> {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new BadRequestException(`User with this email does not exist`);
    }
    return user;
  }

  async create(userData: CreateUserDto): Promise<User> {
    const { username, email, hashPwd } = userData;
    const user = new User();
    user.username = username;
    user.email = email;
    user.hashPwd = hashPwd;
    await user.save();
    return user;
  }

  async getById(id: string): Promise<User> {
    const user = await User.findOne({ where: { id } });
    if (!user) {
      throw new BadRequestException(`User with this id does not exist.`);
    }
    return user;
  }

  async setHashToken(token: string, user: User, options: OptionsHashToken) {
    const hashToken = await hashData(token);
    await this.setOrRemoveHashToken(user, options, hashToken);
    await user.save();
  }

  async removeHashToken(user: User, options: OptionsHashToken): Promise<void> {
    await this.setOrRemoveHashToken(user, options, null);
    await user.save();
  }

  private async setOrRemoveHashToken(user: User, options: OptionsHashToken, hashToken: string): Promise<void> {
    const { tokenType } = options;
    switch (tokenType) {
      case 'refresh':
        user.currentHashRefreshToken = hashToken;
        break;
      default:
        throw new HttpException('Invalid token type', 400);
    }
    await user.save();
  }

  async verifyToken(data: string, hashedData: string, error: HttpException): Promise<void> {
    const isTokenMatching = await checkHash(data, hashedData);
    if (!isTokenMatching) {
      throw error;
    }
  }

  async updateUserStatus(user: User, status: Status): Promise<void> {
    user.status = status;
    await user.save();
  }

  async changePassword(user: User, newPassword: string): Promise<void> {
    user.hashPwd = await hashData(newPassword);
    await user.save();
  }
}
