import { Controller, Get, UseGuards } from '@nestjs/common';

import { CurrentUser } from '@common/decorators';
import { RoleGuard } from '@domain/authentication/guards';

import { Role, UserEntity } from './types';
import { GetOneUserResponse } from '@types';

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
