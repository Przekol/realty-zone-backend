import { BeforeInsert, Entity, ManyToOne } from 'typeorm';

import { User } from '@api/users/entities';
import { AbstractToken } from '@providers/tokens/entities/abstract-token.entity';

import { TokenEntity } from '@types';

@Entity({ name: 'tokens_activation' })
export class ActivationToken extends AbstractToken implements TokenEntity {
  @ManyToOne(() => User, (user) => user.activationTokens)
  user: User;

  @BeforeInsert()
  setExpiresIn() {
    this.expiresIn = Date.now() + 60 * 60 * 1000;
  }
}
