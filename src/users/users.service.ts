import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

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
    const newUser = User.create(userData);
    await newUser.save();
    return newUser;
  }
}
