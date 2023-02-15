import { Controller, Get, UseGuards } from '@nestjs/common';

import { Role, UserEntity } from './types';
import { GetOneUserResponse } from '../../@types';
import { RoleGuard } from '../authentication/guards/role.guard';
import { CurrentUser } from '../decorators';

@UseGuards(RoleGuard(Role.User))
@Controller('users')
export class UsersController {
  @UseGuards(RoleGuard(Role.Admin))
  @Get()
  async getUsers() {
    return {
      users: 'tutaj jest lista',
    };
  }
  @Get('/profile')
  async getUser(@CurrentUser() user: UserEntity): Promise<GetOneUserResponse> {
    return user;
  }
}
