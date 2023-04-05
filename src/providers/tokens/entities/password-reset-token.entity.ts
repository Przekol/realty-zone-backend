import { BeforeInsert, Entity, ManyToOne } from 'typeorm';

import { User } from '@api/users/entities';
import { AbstractToken } from '@providers/tokens/entities/abstract-token.entity';

import { TokenEntity } from '@types';

@Entity({ name: 'tokens_password_reset' })
export class PasswordResetToken extends AbstractToken implements TokenEntity {
  @ManyToOne(() => User, (user) => user.passwordResetTokens)
  user: User;

  @BeforeInsert()
  setExpiresIn() {
    this.expiresIn = Date.now() + 60 * 60 * 1000;
  }
}
