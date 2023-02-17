import { UserEntity } from '@domain/users/types';

declare global {
  namespace Express {
    interface Request {
      user?: UserEntity;
    }
  }
}
