import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { Status } from 'src/users/types';

import { UserInactiveException } from '../../exceptions';

@Injectable()
export class ActiveUserGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const user = request.user;

    if (!user || user.status !== Status.ACTIVE) {
      throw new UserInactiveException(user.status);
    }
    return true;
  }
}
