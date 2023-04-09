import { Type } from 'class-transformer';
import { IsOptional, IsString, MaxLength, ValidateNested } from 'class-validator';

import { PhotoDto } from '@providers/photos/dto';

export class UserProfileDto {
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

  @IsOptional()
  @Type(() => PhotoDto)
  @ValidateNested()
  avatar?: PhotoDto;
}
