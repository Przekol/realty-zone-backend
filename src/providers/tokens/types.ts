import { ActivationToken, PasswordResetToken } from '@providers/tokens/entities';

import { UserEntity } from '@domain/users/types';

export interface AbstractTokenEntity {
  id: string;
  hashToken: string;
  isUsed: boolean;
  expiresIn: number;
  createdAt: Date;
  updatedAt: Date;
}
export interface TokenEntity extends AbstractTokenEntity {
  user: UserEntity;
}
export interface TokenOptions {
  tokenType: 'activation' | 'password-reset';
}

export type TokenEntityType = ActivationToken | PasswordResetToken;

export interface TokenPayload {
  userId: string;
  tokenType: TokenOptions['tokenType'];
}
export interface JwtTokenOptions {
  secret: string;
  expiresIn: number;
}
