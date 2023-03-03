import { PasswordResetTokenEntity } from '@domain/reset-password/types';

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
  activationHashToken?: string;
  passwordResetTokens: PasswordResetTokenEntity[];
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

export interface AddressEntity {
  id: string;
  street: string;
  streetNumber: string;
  flatNumber: string;
  zipCode: string;
  city: string;
  country: string;
}

export interface OptionsHashToken {
  tokenType: 'activation' | 'refresh';
}
