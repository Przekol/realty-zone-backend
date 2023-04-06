import { Market, Ownership, Status, Transaction, Types } from '@providers/dictionaries/entities/dictionary.entity';

export interface DictionaryEntity {
  id: number;
  name: string;
}

export type EntityClass = Market | Transaction | Ownership | Status | Types;
