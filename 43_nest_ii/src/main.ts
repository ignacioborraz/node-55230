import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser())
  app.setGlobalPrefix("api")
  const env = app.get(ConfigService);
  const PORT = env.get('PORT');
  await app.listen(PORT);
  console.log('server ready on port ' + PORT);
}
bootstrap();
