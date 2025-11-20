import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Servir frontend compilado desde backend/public
  app.use(express.static(join(__dirname, '..', 'public')));

  await app.listen(3000);
  console.log('✅ Servidor corriendo en http://localhost:3000');
}
bootstrap();
