import { Expose, Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';

import { UserProfileSerializerResponse } from '@types';
class PhotoResponseDto {
  @Expose()
  id: string;

  @Expose()
  url: string;
}

class UserResponseDto {
  @Expose()
  id: string;

  @Expose()
  email: string;
}
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
  @Type(() => UserResponseDto)
  @ValidateNested()
  user: UserResponseDto;

  @Expose()
  @Type(() => PhotoResponseDto)
  @ValidateNested()
  avatar: PhotoResponseDto;
}
