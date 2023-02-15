import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  const configService = app.get(ConfigService);
  const port = configService.get('APP_PORT');
  const hostname = configService.get('APP_HOSTNAME');

  await app.listen(port, hostname, () => {
    console.log(`http://${hostname}:${port}`);
  });
}
bootstrap();
