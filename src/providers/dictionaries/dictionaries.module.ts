import { Module } from '@nestjs/common';

import { DictionariesService } from './dictionaries.service';

@Module({
  providers: [DictionariesService],
})
export class DictionariesModule {}
