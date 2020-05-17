import { prop, arrayProp, Ref, modelOptions } from '@typegoose/typegoose';
import { ApiProperty } from '@nestjs/swagger';
import { Article } from './articles.model';

@modelOptions({ schemaOptions: { timestamps: true } })
export class Tag {
  @ApiProperty({ description: '分类名称' })
  @prop({ required: true })
  name: String;

  @ApiProperty({ description: '分类描述' })
  @prop()
  desc: String;

  @ApiProperty({ description: '所属上级标签' })
  @prop()
  parent: String;

  @arrayProp({
    ref: 'Article',
    localField: '_id',
    foreignField: 'tags',
  })
  articles?: Ref<Article>[];
}
