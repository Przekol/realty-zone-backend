import { UserEntity } from '../../domain/users/types';

export type CreateUserRequest = Pick<UserEntity, 'username' | 'email' | 'hashPwd'>;

export type RegisterUserRequest = Omit<CreateUserRequest, 'hashPwd'> & { password: string };
