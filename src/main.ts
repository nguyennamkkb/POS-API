import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from 'helper/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('pos-api');
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(3456);
}
bootstrap();
