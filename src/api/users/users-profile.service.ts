import { ConflictException, Injectable } from '@nestjs/common';

import { UserProfileDto } from '@api/users/dto';
import { User, UserProfile } from '@api/users/entities';
import { Photo } from '@providers/photos/entities';
import { PhotosService } from '@providers/photos/photos.service';

@Injectable()
export class UsersProfileService {
  constructor(private readonly photosService: PhotosService) {}

  async createProfile(userProfileDto: UserProfileDto, user: User) {
    const existingProfile = await UserProfile.findOne({ where: { user: { id: user.id } } });
    if (existingProfile) {
      throw new ConflictException('User already has a profile');
    }
    let photo: Photo | null = null;
    if (userProfileDto.avatar) {
      photo = await this.photosService.createPhoto(userProfileDto.avatar);
    }
    return this.createNewUserProfile(userProfileDto, user, photo);
  }

  private async createNewUserProfile(userProfileDto: UserProfileDto, user: User, photo: Photo) {
    const userProfile = new UserProfile();
    userProfile.firstName = userProfileDto.firstName;
    userProfile.lastName = userProfileDto.lastName;
    userProfile.phoneNumber = userProfileDto.phoneNumber;
    userProfile.username = userProfileDto.username;
    await userProfile.save();
    userProfile.user = user;
    userProfile.avatar = photo;
    return userProfile.save();
  }

  async updateProfile(userProfileDto: UserProfileDto, user: User) {
    const userProfile = await UserProfile.findOneOrFail({
      where: { user: { id: user.id } },
      relations: { avatar: true },
    });
    await this.updateAvatar(userProfile, userProfileDto);

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

  private async updateAvatar(userProfile: UserProfile, userProfileDto: UserProfileDto) {
    if (userProfileDto.avatar) {
      if (userProfile.avatar) {
        const avatar = userProfile.avatar;
        userProfile.avatar = null;
        await userProfile.save();
        await this.photosService.deletePhoto(avatar);
      }
      userProfile.avatar = await this.photosService.createPhoto(userProfileDto.avatar);
    }
  }
}
