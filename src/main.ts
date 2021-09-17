import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { ValidationPipe } from '@nestjs/common';
import configuration from '../config/configuration';

let port;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }))
  app.setGlobalPrefix('/api')
  port = configuration.port

  const swaggerConfig = new DocumentBuilder()
    .setTitle('URL Encoder')
    .setDescription('URL Encoder API Documentation')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig)
  SwaggerModule.setup('/docs', app, document)

  await app.listen(port);
}

bootstrap().then(() => {
  console.info(`
------------
Internal Application Started!
API: http://localhost:${port}/api
API Docs: http://localhost:${port}/docs
------------
`)
});

