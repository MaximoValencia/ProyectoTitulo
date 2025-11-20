import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Servir frontend compilado desde backend/public
  app.use(express.static(join(__dirname, '..', 'public')));
  
    // Devolver index.html en rutas no API para permitir el enrutado del frontend
  const apiPrefixes = ['/auth', '/patients', '/medicines', '/deliveries'];
  app.use((req, res, next) => {
    const isApiRoute = apiPrefixes.some((prefix) => req.path.startsWith(prefix));
    const isAsset = req.path.includes('.');

    if (req.method === 'GET' && !isApiRoute && !isAsset) {
      return res.sendFile(join(__dirname, '..', 'public', 'index.html'));
    }

    next();
  });

  await app.listen(3000);
  console.log('✅ Servidor corriendo en http://localhost:3000');
}
bootstrap();
