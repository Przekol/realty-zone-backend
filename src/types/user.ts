export interface UserEntity {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  hashPwd: string;
  phone: string;
  address: UserAddress;
  status: UserStatus;
  createdAt: Date;
  updatedAt: Date;
}

export enum UserStatus {
  ACTIVE = 'active',
  EMAIL_NOT_VERIFIED = 'email_not_verified',
  BANNED = 'banned',
}

export interface UserAddress {
  id: string;
  street: string;
  streetNumber: string;
  flatNumber: string;
  zipCode: string;
  city: string;
  country: string;
}
