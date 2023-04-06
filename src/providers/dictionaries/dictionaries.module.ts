import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Market, Ownership, Status, Transaction, Types } from '@providers/dictionaries/entities/dictionary.entity';

import { DictionariesService } from './dictionaries.service';

@Module({
  imports: [TypeOrmModule.forFeature([Market, Ownership, Types, Status, Transaction])],
  providers: [DictionariesService],
  exports: [DictionariesService],
})
export class DictionariesModule {}
