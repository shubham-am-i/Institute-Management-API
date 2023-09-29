import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from 'src/app.module';
import { HttpExceptionFilter } from './http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true
    })
  );
  app.useGlobalFilters(new HttpExceptionFilter());
  const port = process.env.PORT;
  await app.listen(port);
}
bootstrap();
