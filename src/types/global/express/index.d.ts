import { UserEntity } from '../../user';

declare global {
  namespace Express {
    interface Request {
      user?: UserEntity;
    }
  }
}
