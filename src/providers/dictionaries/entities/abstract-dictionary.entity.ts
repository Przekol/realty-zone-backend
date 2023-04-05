import { BaseEntity, Column, PrimaryGeneratedColumn } from 'typeorm';

import { DictionaryEntity } from '@types';

export abstract class DictionaryBase extends BaseEntity implements DictionaryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
