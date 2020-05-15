import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors()
  const options = new DocumentBuilder()
    .setTitle('CD-admin后台接口文档')
    .setDescription('cd-admin api-center')
    .setVersion('1.0')
    .addTag('admin')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  const PORT = process.env.ADMIN_PORT || 3000
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(PORT);
  console.log(`http://localhost:${PORT}/api-docs`)
}
bootstrap();
