import { AddressEntity } from '../address';

export interface UserEntity {
  id: string;
  firstName?: string;
  lastName?: string;
  username: string;
  email: string;
  roles: Role[];
  hashPwd: string;
  phone?: string;
  address?: AddressEntity;
  status: Status;
  createdAt: Date;
  updatedAt: Date;
}

export enum Status {
  ACTIVE,
  EMAIL_NOT_VERIFIED,
  BANNED,
}

export enum Role {
  User,
  Admin,
}
