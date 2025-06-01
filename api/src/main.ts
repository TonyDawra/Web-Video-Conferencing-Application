import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  await app.listen(3000, () => {
    Logger.log(`server is runniung on http//:localhost:3000`, `Bootstrap`);
    const server = app.getHttpServer();
    const router = server._events.request._router;

    router.stack.forEach((layer) => {
      if (layer.route) {
        const { path, methods } = layer.route;
        const method = Object.keys(methods).pop().toUpperCase();
        Logger.log(`${method} /${path}`, `Router`)
      }

    });

  })
}
bootstrap();