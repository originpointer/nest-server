import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

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
  await app.listen(3000, async () => {
    console.log(`Application is running on: ${await app.getUrl()}`);
  });
}

bootstrap();
