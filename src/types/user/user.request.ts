import { UserEntity } from './user';

export type CreateUserRequest = Pick<UserEntity, 'email' | 'hashPwd'>;

export type RegisterUserRequest = Omit<CreateUserRequest, 'hashPwd'> & { password: string };
export type LoginUserRequest = Pick<RegisterUserRequest, 'email' | 'password'>;
export type UpdateUserRequest = {
  username?: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
};
