import { UnauthorizedException } from '@nestjs/common';

export class UnauthorizedAuthenticationTokenException extends UnauthorizedException {
  constructor(code: string) {
    super({ message: 'Wrong credentials provided', code });
  }
}
