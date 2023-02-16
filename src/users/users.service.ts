import { HttpException, Injectable, NotFoundException } from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { OptionsHashToken, Status, UserEntity } from './types';
import { UserLoginException } from '../exceptions';
import { checkHash, hashData } from '../utils';

@Injectable()
export class UsersService {
  async getByEmail(email: string): Promise<User> {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException(`User with this email does not exist`);
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

  async getById(id: string): Promise<UserEntity> {
    const user = await User.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User with this id does not exist.');
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
      case 'activation':
        user.activationHashToken = hashToken;
        break;
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

  async checkUserActiveStatus(status: Status): Promise<void> {
    if (status !== Status.ACTIVE) {
      throw new UserLoginException(status);
    }
  }
}
