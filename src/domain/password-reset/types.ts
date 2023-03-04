import { UserEntity } from '@domain/users/types';

export interface PasswordResetTokenEntity {
  id: string;
  hashToken: string;
  isUsed: boolean;
  user: UserEntity;
  expiresIn: number;
  createdAt: Date;
  updatedAt: Date;
}
