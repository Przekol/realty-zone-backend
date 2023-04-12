import { DictionaryEntity } from './dictionary';

export type DictionaryResponse = {
  market: DictionaryEntity[];
  transaction: DictionaryEntity[];
  ownership: DictionaryEntity[];
  status: DictionaryEntity[];
  type: DictionaryEntity[];
};
