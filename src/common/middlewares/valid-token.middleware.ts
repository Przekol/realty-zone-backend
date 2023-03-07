import { forwardRef, Inject, Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { NextFunction, Request, Response } from 'express';

import { TokensService } from '@providers/tokens';
import { ValidTokenDto } from '@providers/tokens/dto/valid-token.dto';

@Injectable()
export class ValidTokenMiddleware implements NestMiddleware {
  constructor(@Inject(forwardRef(() => TokensService)) private readonly tokensService: TokensService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const validTokenDto = plainToInstance(ValidTokenDto, req.query);

    const { userId, tokenType } = await this.tokensService.decodeToken(validTokenDto);

    const tokenActive = await this.tokensService.getTokenActiveByUserId(userId, { tokenType });

    if (!tokenActive) {
      throw new UnauthorizedException('Invalid or expired token!');
    }

    await this.tokensService.verifyToken(validTokenDto.token, tokenActive.hashToken);

    req.tokenActive = tokenActive;
    next();
  }
}
