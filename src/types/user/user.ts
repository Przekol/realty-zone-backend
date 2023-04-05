import { AddressEntity } from '../address';
import { TokenEntity } from '../token';

export interface UserEntity {
  id: string;
  firstName?: string;
  lastName?: string;
  username?: string;
  src?: string;
  email: string;
  roles: Role[];
  hashPwd: string;
  phone?: string;
  status: Status;
  userAddress: UserAddressEntity;
  activationTokens: TokenEntity[];
  passwordResetTokens: TokenEntity[];
  refreshTokens: TokenEntity[];
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

export interface UserSerializerResponse {
  email: string;
  username?: string;
  firstName?: string;
  lastName?: string;
  src?: string;
  status: Status;
  roles: string[];
}

export interface UserAddressEntity {
  id: string;
  user: UserEntity;
  address: AddressEntity;
}
