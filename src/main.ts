import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';

import { validationPipeOptions } from '@config';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe(validationPipeOptions));
  const configService = app.get(ConfigService);
  const port = configService.get('APP_PORT');
  const hostname = configService.get('APP_HOSTNAME');

  await app.listen(port, hostname, () => {
    console.log(`http://${hostname}:${port}`);
  });
}
bootstrap();
