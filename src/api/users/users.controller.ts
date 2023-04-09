import {
  Body,
  Controller,
  Get,
  HttpCode,
  Patch,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';

import { UserProfileDto, UserProfileResponseDto } from '@api/users/dto';
import { UsersProfileService } from '@api/users/users-profile.service';
import { CurrentUser } from '@common/decorators';
import { JwtAuthenticationGuard, RoleGuard } from '@common/guards';
import { Serialize } from '@common/interceptors';
import { createMulterOptions, StorageDestinations } from '@config';

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

  @HttpCode(201)
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

  @HttpCode(201)
  @UseGuards(JwtAuthenticationGuard)
  @UseInterceptors(FilesInterceptor('avatar', 1, { storage: createMulterOptions(StorageDestinations.AVATARS) }))
  @Post('/profile/avatar')
  async uploadAvatar(@UploadedFiles() avatar: Express.Multer.File[], @CurrentUser() user: User) {
    return this.usersProfileService.uploadAvatar(avatar[0], user);
  }
}
