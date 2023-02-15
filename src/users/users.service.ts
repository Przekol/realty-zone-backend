import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { OptionsHashToken, Status, UserEntity } from './types';
import { hashData } from '../utils';

@Injectable()
export class UsersService {
  async getByEmail(email: string): Promise<User> {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new HttpException(`User with email ${email} already exists`, HttpStatus.NOT_FOUND);
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
      throw new HttpException('User with this id does not exist.', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async setHashToken(token: string, user: User, options: OptionsHashToken) {
    const { tokenType } = options;
    const hashToken = await hashData(token);
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

  async updateUserStatus(user: User, status: Status): Promise<void> {
    user.status = status;
    await user.save();
  }
}
