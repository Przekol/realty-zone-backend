import { UserEntity } from '@domain/users/types';

import { TokenEntityType } from '@providers/tokens/types';

declare global {
  namespace Express {
    interface Request {
      user?: UserEntity;
      tokenActive?: TokenEntityType;
    }
  }
}
