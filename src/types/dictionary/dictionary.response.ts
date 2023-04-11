import { DictionaryEntity } from '@types';

export type DictionaryResponse = {
  market: DictionaryEntity[];
  transaction: DictionaryEntity[];
  ownership: DictionaryEntity[];
  status: DictionaryEntity[];
  type: DictionaryEntity[];
};
