import { UserEntity } from './user';

export type CreateUserRequest = Pick<UserEntity, 'email' | 'hashPwd'>;

export type RegisterUserRequest = Omit<CreateUserRequest, 'hashPwd'> & { password: string };
