import { forwardRef, Inject, Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Request, Response, NextFunction } from 'express';

import { PasswordResetService } from '@domain/password-reset';
import { VerifyPasswordResetTokenDto } from '@domain/password-reset/dto';

@Injectable()
export class ValidPasswordResetTokenMiddleware implements NestMiddleware {
  constructor(
    @Inject(forwardRef(() => PasswordResetService)) private readonly passwordResetService: PasswordResetService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const verifyPasswordResetTokenDto = plainToInstance(VerifyPasswordResetTokenDto, req.query);

    const { token, userId } = verifyPasswordResetTokenDto;

    const passwordResetTokenActive = await this.passwordResetService.getResetTokenActiveByUserId(userId);

    if (!passwordResetTokenActive) {
      throw new UnauthorizedException('Bad confirmation token');
    }
    await this.passwordResetService.verifyToken(
      token || '',
      passwordResetTokenActive.hashToken,
      new UnauthorizedException('Bad confirmation token'),
    );
    req.passwordResetToken = passwordResetTokenActive;
    next();
  }
}
