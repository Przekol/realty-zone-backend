import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from '../../@types';

@Injectable()
export class UsersService {
  async getByEmail(email: string): Promise<UserEntity> {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new HttpException(`User with email ${email} already exists`, HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async create(userData: CreateUserDto): Promise<UserEntity> {
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
}
