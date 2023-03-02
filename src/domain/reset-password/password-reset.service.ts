import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

import { PasswordResetToken } from '@domain/reset-password/entities';
import { User } from '@domain/users/entities';
import { hashData } from '@shared/utils';

@Injectable()
export class PasswordResetService {
  async getActivePasswordResetTokenForUser(user: User): Promise<PasswordResetToken | null> {
    const token = await PasswordResetToken.findOne({
      where: { user: { id: user.id }, isUsed: false },
    });
    if (token && token.expiresIn < Date.now()) {
      return null;
    }
    return token;
  }

  async createPasswordResetToken(user: User): Promise<PasswordResetToken> {
    const token = new PasswordResetToken();
    token.hashToken = await hashData(uuid());
    await token.save();
    token.user = user;
    await token.save();
    return token;
  }
}
