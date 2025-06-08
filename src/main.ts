import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  app.enableCors({
    origin: ['https://mario-cristian-dascalu.netlify.app/'], // 👈 cámbialo por el real
    methods: ['POST', 'GET'],
  });

  await app.listen(process.env.PORT || 3000); // para Render
}
bootstrap();
