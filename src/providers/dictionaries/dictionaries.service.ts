import { Injectable } from '@nestjs/common';

import { FindDictionariesDto } from '@providers/dictionaries/dto/find-dictionaries.dto';
import { Market, Ownership, Status, Transaction, Types } from '@providers/dictionaries/entities/dictionary.entity';

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
}
