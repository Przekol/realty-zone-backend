import { User } from '@domain/users/entities';

export interface PasswordResetTokenEntity {
  id: string;
  hashToken: string;
  isUsed: boolean;
  user: User;
  expiresIn: number;
  createdAt: Date;
  updatedAt: Date;
}
