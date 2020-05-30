import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();
  // app.useGlobalInterceptors(new TransformInterceptor())
  app.setGlobalPrefix('api'); //设置公共接口路径api
  const options = new DocumentBuilder()
    .setTitle('CD-前台接口文档')
    .setDescription('cd-blog')
    .setVersion('1.0')
    .addTag('blog')
    .setBasePath('api')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  const PORT = process.env.BLOG_PORT || 3000;
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(PORT);
  console.log(`http://localhost:${PORT}/api-docs`);
}
bootstrap();
