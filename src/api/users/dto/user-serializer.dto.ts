import { Expose } from 'class-transformer';

import { Role, Status, UserSerializerResponse } from '@types';

export class UserSerializerDto implements UserSerializerResponse {
  @Expose()
  id: string;

  @Expose()
  email: string;

  @Expose()
  username?: string;

  @Expose()
  status: Status;

  @Expose()
  roles: Role[];
}
