import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();

  const PORT = process.env.HTTP_PORT || 3000;
  app.listen(PORT, () => {console.log(`Library is listening a port ${PORT}...`);});
}
bootstrap();
