import { prop, modelOptions, arrayProp, Ref } from '@typegoose/typegoose';
import { ApiProperty } from '@nestjs/swagger';
import { Article } from './articles.model';
@modelOptions({
  schemaOptions: { timestamps: true, toJSON: { virtuals: true } },
})
export class Category {
  @ApiProperty({ description: '分类名称' })
  @prop({ required: true })
  name: String;

  @ApiProperty({ description: '分类描述' })
  @prop()
  desc: String;

  @arrayProp({
    ref: 'Article',
    localField: '_id',
    foreignField: 'category',
  })
  articles?: Ref<Article>[];
}
