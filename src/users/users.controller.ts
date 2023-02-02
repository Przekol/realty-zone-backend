import { Controller, Get, UseGuards } from '@nestjs/common';
import { RoleGuard } from '../authentication/guards/role.guard';
import { Role } from '../../@types';

@Controller('users')
export class UsersController {
  @UseGuards(RoleGuard(Role.Admin))
  @Get()
  async getUsers() {
    return {
      users: 'tutaj jest lista',
    };
  }
}
