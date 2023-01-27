import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { hashData } from '../utils';

@Injectable()
export class AuthenticationService {
  constructor(private readonly usersService: UsersService) {}
  async register(registrationData: RegisterDto) {
    const hashPwd = await hashData(registrationData.password);

    return await this.usersService.create({
      ...registrationData,
      hashPwd,
    });
  }
}
