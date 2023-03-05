import { ActivationToken, PasswordResetToken } from '@providers/tokens/entities';

import { UserEntity } from '@domain/users/types';

export interface TokenEntity {
  id: string;
  hashToken: string;
  isUsed: boolean;
  user: UserEntity;
  expiresIn: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface TokenOptions {
  tokenType: 'activation' | 'password-reset';
}

export type TokenType = ActivationToken | PasswordResetToken;
