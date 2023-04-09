import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';

import { UserProfileDto, UserSerializerDto } from '@api/users/dto';
import { UserProfileSerializerDto } from '@api/users/dto/user-profile-serializer.dto';
import { UsersProfileService } from '@api/users/users-profile.service';
import { CurrentUser } from '@common/decorators';
import { JwtAuthenticationGuard, RoleGuard } from '@common/guards';
import { Serialize } from '@common/interceptors';

import { UserDetailsResponse, Role } from '@types';

import { User } from './entities';

@UseGuards(RoleGuard(Role.User))
@Controller('users')
export class UsersController {
  constructor(private readonly usersProfileService: UsersProfileService) {}

  @UseGuards(JwtAuthenticationGuard)
  @Serialize(UserSerializerDto)
  @Get('/me')
  async getMe(@CurrentUser() user: UserDetailsResponse): Promise<UserDetailsResponse> {
    return user;
  }

  @UseGuards(JwtAuthenticationGuard)
  @Serialize(UserProfileSerializerDto)
  @Post('/profile')
  async createProfile(@Body() userProfileDto: UserProfileDto, @CurrentUser() user: User) {
    return this.usersProfileService.createProfile(userProfileDto, user);
  }
}
