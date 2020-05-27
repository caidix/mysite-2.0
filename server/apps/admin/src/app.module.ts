import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbModule } from 'libs/db';
import { MulterModule } from '@nestjs/platform-express';
import { CommonModule } from '@app/common';
import { AuthModule } from 'apps/server/src/auth/auth.module';
import { TagsModule } from './tags/tags.module';
import { ArticlesModule } from './articles/articles.module';
import { CategoriesModule } from './categories/categories.module';
import { GatherModule } from './gather/gather.module';
import { UsersModule } from './users/users.module';
const MAO = require('multer-aliyun-oss');
@Module({
  imports: [
    CommonModule,
    MulterModule.registerAsync({
      useFactory() {
        return {
          storage: MAO({
            config: {
              region: process.env.OSS_REGION,
              accessKeyId: process.env.OSS_ACCESS_KEY_ID,
              accessKeySecret: process.env.OSS_ACCESS_KEY_SECRET,
              bucket: process.env.OSS_BUCKET,
            },
          }),
        };
      },
    }),
    DbModule,
    AuthModule,
    ArticlesModule,
    TagsModule,
    CategoriesModule,
    GatherModule,
    UsersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
