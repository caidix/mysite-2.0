import {
  prop,
  arrayProp,
  Ref,
  mongoose,
  modelOptions,
} from '@typegoose/typegoose';
import { ApiProperty } from '@nestjs/swagger';
import { Tag } from './tags.model';
import { Category } from './category.model';
import { Gather } from './gather.model';
// import { Moment } from 'moment';
// const moment = require('moment');

@modelOptions({
  schemaOptions: { timestamps: true, toJSON: { virtuals: true } },
})
export class Article {
  @ApiProperty({ description: '文章标题' })
  @prop({ validate: /\S+/, equired: true })
  title: String;

  @ApiProperty({ description: '文章内容' })
  @prop()
  articleContent?: Object;

  @ApiProperty({ description: '作者' })
  @prop({
    validate: /\S+/,
  })
  author: String;

  @ApiProperty({ description: '文章来源：转载 原创 混合' })
  @prop({
    default: 0,
  })
  origin: Number;

  @ApiProperty({ description: '文章关键字（SEO）' })
  @prop({
    default: '',
  })
  keyword?: String;

  @ApiProperty({ description: '背景图片' })
  @prop({
    default: '',
  })
  img_url?: String;

  @ApiProperty({ description: '文章标签' })
  @arrayProp({
    ref: 'Tag',
    refType: mongoose.Schema.Types.ObjectId,
  })
  tags?: Ref<Tag>[];

  @ApiProperty({ description: '文章分类' })
  @arrayProp({
    ref: 'Category',
    refType: mongoose.Schema.Types.ObjectId,
  })
  category?: Ref<Category>[];

  @ApiProperty({ description: '文章归档' })
  @prop({
    ref: 'Gather',
    refType: mongoose.Schema.Types.ObjectId,
  })
  gather?: Ref<Gather>;

  @ApiProperty({ description: '文章简介' })
  @prop({})
  introduction: String;

  @ApiProperty({ description: '是否为草稿，草稿为1' })
  @prop({
    default: 0,
  })
  draft: number;

  @ApiProperty({ description: '浏览总数' })
  @prop({
    default: 0,
  })
  viewCount: number;

  @ApiProperty({ description: '浏览总数' })
  @prop({
    default: 0,
  })
  likes: number;

  // @prop({
  //   get(val) {
  //     return val;
  //   },
  //   set: date => {
  //     return moment(date).format('YYYY-MM-DD HH:mm:ss');
  //   },
  //   default: moment().format('YYYY-MM-DD HH:mm:ss'),
  // })
  // addTime?: Moment;
}
