import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get('APP_PORT');
  const hostname = configService.get('APP_HOSTNAME');

  await app.listen(port, hostname, () => {
    console.log(`http://${hostname}:${port}`);
  });
}
bootstrap();
