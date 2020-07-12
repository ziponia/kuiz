import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import logger from 'morgan';

import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();
  app.use(logger('dev'));
  await app.listen(process.env.PORT || 3001);

  Logger.log(`Running Application ${await app.getUrl()}`);
}
bootstrap();
