import { UnauthorizedException } from '@nestjs/common';

import { Status } from '@http/users/types';

export class UserInactiveException extends UnauthorizedException {
  constructor(status: Status) {
    let message;

    switch (status) {
      case Status.PENDING_EMAIL_CONFIRMATION:
        message = 'Email not verified';
        break;
      case Status.BANNED:
        message = 'User Banned';
        break;
      default:
        message = 'Wrong credentials provided';
    }
    super({ message });
  }
}
