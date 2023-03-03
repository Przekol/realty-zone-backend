import { Injectable } from '@nestjs/common';
import { DataSource, MoreThan } from 'typeorm';
import { v4 as uuid } from 'uuid';

import { PasswordResetToken } from '@domain/reset-password/entities';
import { User } from '@domain/users/entities';
import { hashData } from '@shared/utils';

@Injectable()
export class PasswordResetService {
  constructor(private readonly dataSource: DataSource) {}

  async isResetTokenActiveForUser(user: User): Promise<boolean> {
    const resetToken = await PasswordResetToken.findOne({
      where: { user: { id: user.id }, isUsed: false, expiresIn: MoreThan(Date.now()) },
    });
    return !!resetToken;
  }

  async createPasswordResetToken(user: User): Promise<PasswordResetToken> {
    const token = new PasswordResetToken();
    token.hashToken = await hashData(uuid());
    token.user = user;
    await this.dataSource.manager.save(token);
    return token;
  }
}
