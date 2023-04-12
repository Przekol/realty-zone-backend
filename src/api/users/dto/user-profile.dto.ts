import { IsOptional, IsString, MaxLength } from 'class-validator';

import { UpdateUserRequest } from '@types';

export class UserProfileDto implements UpdateUserRequest {
  @IsOptional()
  @IsString()
  @MaxLength(50)
  username?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  firstName?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  lastName?: string;

  @IsOptional()
  @IsString()
  @MaxLength(15)
  phoneNumber?: string;
}
