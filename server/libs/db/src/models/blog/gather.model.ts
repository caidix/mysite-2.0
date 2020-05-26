import { prop, arrayProp, Ref, modelOptions } from '@typegoose/typegoose';
import { ApiProperty } from '@nestjs/swagger';
import { Article } from './articles.model';

@modelOptions({
  schemaOptions: { timestamps: true, toJSON: { virtuals: true } },
})
export class Gather {
  @ApiProperty({ description: '归档名字' })
  @prop({ required: true })
  name: String;

  @ApiProperty({ description: '标签描述' })
  @prop()
  desc: String;

  @ApiProperty({ description: '背景图片' })
  @prop()
  img: String;

  @arrayProp({
    ref: 'Article',
    localField: '_id',
    foreignField: 'gather',
  })
  articles?: Ref<Article>;
}
