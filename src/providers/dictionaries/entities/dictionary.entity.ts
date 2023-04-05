import { Entity, OneToMany } from 'typeorm';

import { Offer } from '@api/offers/entities';
import { DictionaryBase } from '@providers/dictionaries/entities/abstract-dictionary.entity';

@Entity({ name: 'dictionary_markets' })
export class Market extends DictionaryBase {
  @OneToMany(() => Offer, (offer) => offer.market)
  offers: Offer[];
}

@Entity({ name: 'dictionary_ownerships' })
export class Ownership extends DictionaryBase {
  @OneToMany(() => Offer, (offer) => offer.ownership)
  offers: Offer[];
}

@Entity({ name: 'dictionary_types' })
export class Types extends DictionaryBase {
  @OneToMany(() => Offer, (offer) => offer.type)
  offers: Offer[];
}

@Entity({ name: 'dictionary_statuses' })
export class Status extends DictionaryBase {
  @OneToMany(() => Offer, (offer) => offer.status)
  offers: Offer[];
}

@Entity({ name: 'dictionary_transactions' })
export class Transaction extends DictionaryBase {
  @OneToMany(() => Offer, (offer) => offer.transaction)
  offers: Offer[];
}
