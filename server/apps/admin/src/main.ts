import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('CD-admin后台接口文档')
    .setDescription('cd-admin api-center')
    .setVersion('1.0')
    .addTag('admin')
    .build();
  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('api-docs', app, document);
  
  await app.listen(3000);
  console.log('http://localhost:3000')
}
bootstrap();
