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
  currentHashRefreshToken?: string;
  createdAt: Date;
  updatedAt: Date;
}

export enum Status {
  PENDING_EMAIL_CONFIRMATION,
  ACTIVE,
  BANNED,
}

export enum Role {
  User,
  Admin,
}
