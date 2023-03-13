import { BeforeInsert, Entity, ManyToOne } from 'typeorm';

import { User } from '@http/users/entities';
import { AbstractToken } from '@providers/tokens/entities/abstract-token.entity';

import { TokenEntity } from '@providers/tokens/types';

@Entity()
export class RefreshToken extends AbstractToken implements TokenEntity {
  @ManyToOne(() => User, (user) => user.refreshTokens)
  user: User;

  @BeforeInsert()
  setExpiresIn() {
    this.expiresIn = Date.now() + 60 * 60 * 10 * 1000;
  }
}
