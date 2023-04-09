import { Expose, Transform, TransformFnParams, Type } from 'class-transformer';
import { IsEnum } from 'class-validator';

import { UserProfileSerializerDto } from '@api/users/dto/user-profile-serializer.dto';

import { Role, Status, UserSerializerResponse } from '@types';
export function getRoleString(role: Role): string {
  switch (role) {
    case Role.User:
      return 'User';
    case Role.Admin:
      return 'Admin';
    default:
      throw new Error(`Invalid role value: ${role}`);
  }
}
export class UserSerializerDto implements UserSerializerResponse {
  @Expose()
  email: string;

  @Expose()
  @Type(() => UserProfileSerializerDto)
  profile: UserProfileSerializerDto;

  @Expose()
  status: Status;

  @Expose()
  @IsEnum(Role, { each: true })
  @Transform(({ value }: TransformFnParams) => value.map((role: Role) => getRoleString(role)))
  roles: string[];
}
