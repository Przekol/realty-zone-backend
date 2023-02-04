import { Controller, Get, UseGuards } from '@nestjs/common';
import { RoleGuard } from '../authentication/guards/role.guard';
import { Role, UserEntity } from '../../@types';
import { CurrentUser } from '../decorators/current-user.decorator';

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
  async getUser(@CurrentUser() user: UserEntity) {
    return {
      user,
    };
  }
}
