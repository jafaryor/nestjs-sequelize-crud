import { NestFactory } from '@nestjs/core';

import { setupSwagger } from './swagger';
import { AppModule } from './app.module';
import { ValidateInputPipe } from './core/pipes/validate.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Global prefix for all routes.
  app.setGlobalPrefix('api/v1');

  // Handle all user input validation globally.
  app.useGlobalPipes(new ValidateInputPipe());

  // Enables the API docs auto-generation.
  setupSwagger(app);

  await app.listen(3000);
}

bootstrap();
