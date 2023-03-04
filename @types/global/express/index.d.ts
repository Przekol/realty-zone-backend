import { PasswordResetToken } from '@domain/password-reset/entities';

import { UserEntity } from '@domain/users/types';

declare global {
  namespace Express {
    interface Request {
      user?: UserEntity;
      passwordResetToken?: PasswordResetToken;
    }
  }
}
