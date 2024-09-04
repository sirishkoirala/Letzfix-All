import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { LogzioLoggerService } from './logzio-logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logzioLoggerService = app.get(LogzioLoggerService);

  app.useLogger(logzioLoggerService);

  // cors as middleware
  const corsOptions: CorsOptions = {
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  };
  app.enableCors(corsOptions);

  // global prefix
  app.setGlobalPrefix('api');
  
  await app.listen(3000);
}
bootstrap();
