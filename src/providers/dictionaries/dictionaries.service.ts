import { Injectable } from '@nestjs/common';

import { FindDictionariesDto } from '@providers/dictionaries/dto/find-dictionaries.dto';
import { Market, Ownership, Status, Transaction, Types } from '@providers/dictionaries/entities/dictionary.entity';

import { DictionaryResponse } from '@types';

@Injectable()
export class DictionariesService {
  async findDictionaries(findDictionariesDto: FindDictionariesDto) {
    return await Promise.all([
      Market.findOneByOrFail({ id: findDictionariesDto.market }),
      Transaction.findOneByOrFail({ id: findDictionariesDto.transaction }),
      Ownership.findOneByOrFail({ id: findDictionariesDto.ownership }),
      Status.findOneByOrFail({ id: findDictionariesDto.status }),
      Types.findOneByOrFail({ id: findDictionariesDto.type }),
    ]);
  }

  async getDictionaries(): Promise<DictionaryResponse> {
    const results = await Promise.all([
      Market.find(),
      Transaction.find(),
      Ownership.find(),
      Status.find(),
      Types.find(),
    ]);

    return {
      market: results[0],
      transaction: results[1],
      ownership: results[2],
      status: results[3],
      type: results[4],
    };
  }
}
