import { Expose } from 'class-transformer';

import { Photo } from '@providers/photos/entities';

import { UserProfileSerializerResponse } from '@types';

export class UserProfileSerializerDto implements UserProfileSerializerResponse {
  @Expose()
  username?: string;
  @Expose()
  firstName?: string;
  @Expose()
  lastName?: string;
  @Expose()
  phoneNumber?: string;
  @Expose()
  avatar: Photo;
}
