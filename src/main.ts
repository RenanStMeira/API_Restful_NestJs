import { NestFactory } from '@nestjs/core';
import { AppModule } from './Module/app.module';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //Configurar pipe para validação
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  );

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  await app.listen(3001);
}
bootstrap();
