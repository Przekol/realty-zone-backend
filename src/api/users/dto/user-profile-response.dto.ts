import { Expose, Transform } from 'class-transformer';

import { avatarUrlMappers, roleMappers, statusMappers } from '@api/users/response.mappers';

import { UserProfileResponse } from '@types';

export class UserProfileResponseDto implements UserProfileResponse {
  @Expose()
  username?: string;

  @Expose()
  firstName?: string;

  @Expose()
  lastName?: string;

  @Expose()
  phoneNumber?: string;

  @Expose()
  @Transform(({ obj }) => avatarUrlMappers(obj.avatar?.url))
  avatar: string;

  @Expose()
  @Transform(({ obj }) => obj.user.email)
  email: string;

  @Expose()
  @Transform(({ obj }) => statusMappers(obj.user.status))
  status: string;

  @Expose()
  @Transform(({ obj }) => roleMappers(obj.user.roles))
  role: string;
}
