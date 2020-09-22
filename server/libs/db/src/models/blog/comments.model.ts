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
export class Comment {
  @ApiProperty({ description: '评论用户昵称' })
  @prop({ required: true })
  username: String;

  @ApiProperty({ description: '评论用户邮箱' })
  @prop({ required: true })
  email: String;

  @ApiProperty({ description: '评论对应的文章id' })
  @prop({
    ref: 'Article',
    refType: mongoose.Schema.Types.ObjectId,
    required: true,
  })
  articleId: Ref<Article>;

  @ApiProperty({ description: '评论内容' })
  @prop({ required: true })
  content: String;

  /**
   * 程度 ： 1为一级评论，2为回复评论， 3为深度评论
   */
  @ApiProperty({ description: '评论程度' })
  @prop({ enum: [1, 2, 3] })
  status: Number;

  /**
   * 查阅： 0为未查阅， 1为查阅
   */
  @ApiProperty({ description: '作者是否查阅' })
  @prop({ default: 0, enum: [0, 1] })
  readed: Number;

  /**
   * 首先会存在使用相同昵称的人的情况，所以需要回复邮箱可以做一定量的区分。
   */
  @ApiProperty({ description: '回复对象' })
  @prop({ default: '' })
  replyName: String;

  @ApiProperty({ description: '回复邮箱' })
  @prop({ default: '' })
  replyEmail: String;

  @ApiProperty({ description: '上级回复id' })
  @prop({ default: '' })
  replyId: String;

  @ApiProperty({ description: '是否为作者--作者统一由后台回复' })
  @prop({ default: false })
  isAuthor: Boolean;
}
