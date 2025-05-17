import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Allow requests from your frontend origin:
  app.enableCors({ origin: 'http://localhost:3000' });
  await app.listen(3001);
  console.log(`🚀 Server listening on http://localhost:3001`);
}
bootstrap();
