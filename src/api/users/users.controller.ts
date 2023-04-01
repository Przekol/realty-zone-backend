import { Controller, Get, UseGuards } from '@nestjs/common';

import { UserSerializerDto } from '@api/users/dto';
import { CurrentUser } from '@common/decorators';
import { JwtAuthenticationGuard, RoleGuard } from '@common/guards';
import { Serialize } from '@common/interceptors';

import { GetOneUserResponse, Role, UserEntity } from '@types';

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

  @UseGuards(JwtAuthenticationGuard)
  @Serialize(UserSerializerDto)
  @Get('/me')
  async getMe(@CurrentUser() user: UserEntity): Promise<GetOneUserResponse> {
    return user;
  }
}
