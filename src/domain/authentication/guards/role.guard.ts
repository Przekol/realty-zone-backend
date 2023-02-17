import { CanActivate, ExecutionContext, mixin, Type } from '@nestjs/common';
import { Request } from 'express';

import { JwtAuthenticationGuard } from './jwt-authentication.guard';
import { Role } from '../../users/types';

export const RoleGuard = (role: Role): Type<CanActivate> => {
  class RoleGuardMixin extends JwtAuthenticationGuard {
    async canActivate(context: ExecutionContext) {
      await super.canActivate(context);

      const request = context.switchToHttp().getRequest<Request>();
      const user = request.user;

      return user?.roles.includes(role);
    }
  }
  return mixin(RoleGuardMixin);
};
