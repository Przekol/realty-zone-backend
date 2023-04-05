import { Expose, Transform, TransformFnParams } from 'class-transformer';
import { IsEnum } from 'class-validator';

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
  username?: string;

  @Expose()
  firstName?: string;

  @Expose()
  lastName?: string;

  @Expose()
  src?: string;

  @Expose()
  status: Status;

  @Expose()
  @IsEnum(Role, { each: true })
  @Transform(({ value }: TransformFnParams) => value.map((role: Role) => getRoleString(role)))
  roles: string[];
}
