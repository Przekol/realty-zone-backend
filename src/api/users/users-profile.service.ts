import { ConflictException, Injectable } from '@nestjs/common';

import { UserProfileDto } from '@api/users/dto';
import { User, UserProfile } from '@api/users/entities';
import { PhotoDto } from '@providers/photos/dto';
import { PhotosService } from '@providers/photos/photos.service';

@Injectable()
export class UsersProfileService {
  constructor(private readonly photosService: PhotosService) {}

  async createProfile(userProfileDto: UserProfileDto, user: User) {
    const existingProfile = await UserProfile.findOne({ where: { user: { id: user.id } } });
    if (existingProfile) {
      throw new ConflictException('User already has a profile');
    }

    return this.createNewUserProfile(userProfileDto, user);
  }

  private async createNewUserProfile(userProfileDto: UserProfileDto, user: User) {
    const userProfile = new UserProfile();
    userProfile.firstName = userProfileDto.firstName;
    userProfile.lastName = userProfileDto.lastName;
    userProfile.phoneNumber = userProfileDto.phoneNumber;
    userProfile.username = userProfileDto.username;
    await userProfile.save();
    userProfile.user = user;
    return userProfile.save();
  }

  async updateProfile(userProfileDto: UserProfileDto, user: User) {
    const userProfile = await this.getProfile(user);

    if (userProfileDto.firstName) {
      userProfile.firstName = userProfileDto.firstName;
    }
    if (userProfileDto.lastName) {
      userProfile.lastName = userProfileDto.lastName;
    }
    if (userProfileDto.phoneNumber) {
      userProfile.phoneNumber = userProfileDto.phoneNumber;
    }
    if (userProfileDto.username) {
      userProfile.username = userProfileDto.username;
    }
    return userProfile.save();
  }

  private async updateAvatar(userProfile: UserProfile, avatar: PhotoDto) {
    if (avatar) {
      if (userProfile.avatar) {
        const avatar = userProfile.avatar;
        userProfile.avatar = null;
        await userProfile.save();
        await this.photosService.deletePhoto(avatar);
      }
      userProfile.avatar = await this.photosService.createPhoto(avatar);
      await userProfile.save();
    }
  }

  async getProfile(user: User) {
    return await UserProfile.findOneOrFail({
      where: { user: { id: user.id } },
      relations: { avatar: true, user: true },
    });
  }

  async uploadAvatar(avatar: Express.Multer.File, user: User) {
    const userProfile = await this.getProfile(user);
    await this.updateAvatar(userProfile, { url: avatar.filename } as PhotoDto);
  }
}
