import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  app.enableCors({
    origin: ['https://mario-cristian-dascalu.netlify.app'],
    methods: ['POST', 'GET', 'OPTIONS'], // Asegúrate de incluir OPTIONS
    allowedHeaders: ['Content-Type'],
  });

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
