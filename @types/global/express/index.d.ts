import { UserEntity } from '../../../src/domain/users/types';

declare global {
  namespace Express {
    interface Request {
      user?: UserEntity;
    }
  }
}
