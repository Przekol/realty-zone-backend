import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
export const typeOrmConfig = (configService: ConfigService) =>
  ({
    type: 'postgres',
    host: configService.get('POSTGRES_HOST'),
    port: configService.get('POSTGRES_PORT'),
    username: configService.get('POSTGRES_USER'),
    password: configService.get('POSTGRES_PASSWORD'),
    database: configService.get('POSTGRES_DB'),
    entities: ['dist/**/**.entity{.ts,.js}'],
    autoLoadEntities: true,
    synchronize: true,
    logging: true,
    namingStrategy: new SnakeNamingStrategy(),
  } as TypeOrmModuleOptions);
