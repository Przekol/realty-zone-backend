import { Injectable } from '@nestjs/common';

import { PasswordResetToken } from '@domain/reset-password/entities';
import { User } from '@domain/users/entities';

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
}
