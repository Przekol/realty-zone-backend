import { ActivationToken, PasswordResetToken, RefreshToken } from '@providers/tokens/entities';

import { UserEntity } from '@types';

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
  tokenType: 'activation' | 'password-reset' | 'refresh' | 'authentication';
}

export type TokenEntityType = ActivationToken | PasswordResetToken | RefreshToken;

export interface TokenPayload {
  userId: string;
  tokenType: TokenOptions['tokenType'];
}
export interface JwtTokenOptions {
  secret: string;
  expiresIn: number;
}

export interface TokenData {
  token: string;
  expiresIn: number;
}
