import { BeforeInsert, Entity, ManyToOne } from 'typeorm';

import { User } from '@http/users/entities';
import { AbstractToken } from '@providers/tokens/entities/abstract-token.entity';

import { TokenEntity } from '@providers/tokens/types';

@Entity()
export class ActivationToken extends AbstractToken implements TokenEntity {
  @ManyToOne(() => User, (user) => user.activationTokens)
  user: User;

  @BeforeInsert()
  setExpiresIn() {
    this.expiresIn = Date.now() + 60 * 60 * 1000;
  }
}
