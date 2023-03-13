import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';

import { UserInactiveException } from '@common/exceptions';

import { Status } from '@http/users/types';

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
