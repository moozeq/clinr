import { NestFactory } from '@nestjs/core';
import { sequelize } from './database/database';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  await sequelize.sync({ force: true });
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
  }));
  await app.listen(3000);
}
bootstrap();
