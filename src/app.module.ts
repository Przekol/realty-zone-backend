import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { getValidationEnvironmentVariables } from './config/environment-variables';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: getValidationEnvironmentVariables(),
    }),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
