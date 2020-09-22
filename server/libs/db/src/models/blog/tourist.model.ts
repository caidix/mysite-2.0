import {
  prop,
  modelOptions,
  arrayProp,
  Ref,
  mongoose,
} from '@typegoose/typegoose';
import { ApiProperty } from '@nestjs/swagger';
import { Article } from './articles.model';
@modelOptions({
  schemaOptions: { timestamps: true, toJSON: { virtuals: true } },
})
export class Tourist {
  @ApiProperty({ description: '生成游客uuid' })
  @prop({ required: true })
  uuid: String;

  @ApiProperty({ description: '游客阅读文章' })
  @arrayProp({
    ref: 'Article',
    refType: mongoose.Schema.Types.ObjectId,
  })
  readed: Ref<Article>[];

  @ApiProperty({ description: '游客观看视频' })
  @prop({ default: [] })
  watched: Array<string>;

  @ApiProperty({ description: 'time' })
  @prop({ type: Date, default: new Date() })
  expireTime: Date;
}
