import { NestFactory } from '@nestjs/core';
import * as helmet from 'helmet';
import { setupSwagger } from './swagger';
import { AppModule } from './app.module';
import { ValidateInputPipe } from './core/pipes/validate.pipe';

/**
 * The 'uncaughtException' event is emitted when an uncaught JavaScript
 * exception bubbles all the way back to the event loop.
 * By default, Node.js handles such exceptions by printing the
 * stack trace to stderr and exiting with code 1.
 */
process.on('uncaughtException', (error, origin) => {
  console.error(`Caught exception: ${error}. \n Exception origin: ${origin}.`);
});

/**
 * The 'unhandledRejection' event is emitted whenever a Promise
 * is rejected and no error handler is attached to the promise
 * within a turn of the event loop.
 * The 'unhandledRejection' event is useful for detecting and
 * keeping track of promises that were rejected whose rejections
 * have not yet been handled.
 */
process.on('unhandledRejection', (reason, promise) => {
  console.warn(`Unhandled Rejection at: ${promise}, reason: ${reason}.`);
});

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // Default text-based logger.
    logger: true,
  });

  // Global prefix for all routes.
  app.setGlobalPrefix('api/v1');

  // Handle all user input validation globally.
  app.useGlobalPipes(new ValidateInputPipe());

  // Enables the API docs auto-generation.
  setupSwagger(app);
  // Use helmet for security.
  app.use(helmet());
  // Enable CORS.
  app.enableCors();

  await app.listen(3000);
}

bootstrap();
