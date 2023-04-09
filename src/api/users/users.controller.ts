import { Body, Controller, Get, Patch, Post, UseGuards } from '@nestjs/common';

import { UserProfileDto, UserProfileResponseDto } from '@api/users/dto';
import { UsersProfileService } from '@api/users/users-profile.service';
import { CurrentUser } from '@common/decorators';
import { JwtAuthenticationGuard, RoleGuard } from '@common/guards';
import { Serialize } from '@common/interceptors';

import { Role } from '@types';

import { User } from './entities';

@UseGuards(RoleGuard(Role.User))
@Controller('users')
export class UsersController {
  constructor(private readonly usersProfileService: UsersProfileService) {}

  @UseGuards(JwtAuthenticationGuard)
  @Serialize(UserProfileResponseDto)
  @Get('/profile')
  async getProfile(@CurrentUser() user: User) {
    return this.usersProfileService.getProfile(user);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Serialize(UserProfileResponseDto)
  @Post('/profile')
  async createProfile(@Body() userProfileDto: UserProfileDto, @CurrentUser() user: User) {
    return this.usersProfileService.createProfile(userProfileDto, user);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Serialize(UserProfileResponseDto)
  @Patch('/profile')
  async updateProfile(@Body() userProfileDto: UserProfileDto, @CurrentUser() user: User) {
    return this.usersProfileService.updateProfile(userProfileDto, user);
  }
}
