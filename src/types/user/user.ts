import { AddressEntity } from '../address';
import { PhotoEntity } from '../photo';
import { TokenEntity } from '../token';

export interface UserEntity {
  id: string;
  email: string;
  roles: Role[];
  hashPwd: string;
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

export interface UserAddressEntity {
  id: string;
  user: UserEntity;
  address: AddressEntity;
}

export interface UserProfileEntity {
  id: string;
  username?: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  avatar: PhotoEntity;
  user: UserEntity;
  createdAt: Date;
  updatedAt: Date;
}
