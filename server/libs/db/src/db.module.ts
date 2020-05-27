import { Module, Global } from '@nestjs/common';
import { DbService } from './db.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { User } from './models/user.model';
import { Article } from './models/blog/articles.model';
import { Tag } from './models/blog/tags.model';
import { Category } from './models/blog/category.model';
import { Gather } from './models/blog/gather.model';

const models = TypegooseModule.forFeature([
  User,
  Article,
  Tag,
  Category,
  Gather,
]);

@Global()
@Module({
  imports: [
    TypegooseModule.forRootAsync({
      useFactory() {
        return {
          uri: process.env.DB,
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useCreateIndex: true,
          useFindAndModify: false,
        };
      },
    }),
    models,
  ],
  providers: [DbService],
  exports: [DbService, models],
})
export class DbModule {}
