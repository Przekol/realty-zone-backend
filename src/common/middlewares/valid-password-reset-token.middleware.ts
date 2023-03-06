import { forwardRef, Inject, Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Request, Response, NextFunction } from 'express';

import { VerifyPasswordResetTokenDto } from '@domain/password-reset/dto';
import { TokensService } from '@providers/tokens';

@Injectable()
export class ValidPasswordResetTokenMiddleware implements NestMiddleware {
  constructor(@Inject(forwardRef(() => TokensService)) private readonly tokensService: TokensService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const verifyPasswordResetTokenDto = plainToInstance(VerifyPasswordResetTokenDto, req.query);

    const { token, userId } = verifyPasswordResetTokenDto;

    const passwordResetTokenActive = await this.tokensService.getTokenActiveByUserId(userId, {
      tokenType: 'password-reset',
    });

    if (!passwordResetTokenActive) {
      throw new UnauthorizedException('Bad confirmation token');
    }
    await this.tokensService.verifyToken(
      token || '',
      passwordResetTokenActive.hashToken,
      new UnauthorizedException('Bad confirmation token'),
    );
    req.passwordResetToken = passwordResetTokenActive;
    next();
  }
}
