import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const docBuilder = new DocumentBuilder();
  docBuilder.setTitle('Cats example');
  docBuilder.setDescription('The cats API description');
  docBuilder.setVersion('1.0.0');
  docBuilder.addTag('cats');
  docBuilder.addBearerAuth();

  const docConfig = docBuilder.build();
  // 创建document
  const document = SwaggerModule.createDocument(app, docConfig);

  SwaggerModule.setup('api', app, document);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.SERVER_LISTENER_PORT, async () => {
    console.log(`Application is running on: ${await app.getUrl()}`);
  });
}

bootstrap();
