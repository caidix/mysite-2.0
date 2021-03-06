import { prop, arrayProp, Ref, modelOptions } from '@typegoose/typegoose';
import { ApiProperty } from '@nestjs/swagger';
import { Article } from './articles.model';
@modelOptions({
  schemaOptions: { timestamps: true, toJSON: { virtuals: true } },
})
export class Tag {
  @ApiProperty({ description: '标签名称' })
  @prop({ required: true })
  name: String;

  @ApiProperty({ description: '标签描述' })
  @prop()
  desc: String;

  @arrayProp({
    ref: 'Article',
    localField: '_id',
    foreignField: 'tags',
  })
  articles?: Ref<Article>[];
}
