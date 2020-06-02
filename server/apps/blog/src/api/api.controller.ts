import {
  Controller,
  Get,
  Query,
  HttpException,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { Article } from 'libs/db/models/blog/articles.model';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { Category } from 'libs/db/models/blog/category.model';
import { Tag } from 'libs/db/models/blog/tags.model';
import { Gather } from 'libs/db/models/blog/gather.model';
import { ApiOperation } from '@nestjs/swagger';
@Controller('site')
export class ApiController {
  constructor(
    @InjectModel(Article)
    private readonly articleModel: ReturnModelType<typeof Article>,
    @InjectModel(Category)
    private readonly categoryModel: ReturnModelType<typeof Category>,
    @InjectModel(Tag)
    private readonly tagModel: ReturnModelType<typeof Tag>,
    @InjectModel(Gather)
    private readonly gatherModel: ReturnModelType<typeof Gather>,
  ) {}
  @Get('list')
  async list(@Query() query) {
    let { limit = 10, page = 1, skip = 0 } = query,
      list = [];
    if (skip < 1) {
      skip = (page - 1) * limit;
    }
    list = await this.articleModel
      .find(
        {},
        {
          articleContent: 0,
          gather: 0,
        },
      )
      .populate(['category', 'tags'])
      .skip(skip)
      .limit(Number(limit))
      .sort({ date: -1 });
    const errors = { Article: ' not found' };
    const total = await this.articleModel.countDocuments();
    if (!list) throw new HttpException({ errors }, 500);
    return {
      code: 0,
      data: { data: list, total },
      message: '获取文章列表成功',
    };
  }
  @Get('find')
  @ApiOperation({ summary: '查找单个文章信息' })
  async findOne(@Query('id') id: String) {
    try {
      const res = await this.articleModel
        .findById(id)
        .populate(['category', 'tags', 'gather']);
      return {
        code: 0,
        data: res,
        message: '获取成功',
      };
    } catch (error) {
      return {
        code: -1,
        data: error,
        message: '获取失败',
      };
    }
  }
  @Get('gather')
  @ApiOperation({ summary: '查找所有归档' })
  async findGather() {
    try {
      const res = await this.gatherModel.find().populate('article');
      return {
        code: 0,
        data: res,
        message: '获取成功',
      };
    } catch (error) {
      return {
        code: -1,
        data: error,
        message: '获取失败',
      };
    }
  }
  @Get('gather')
  @ApiOperation({ summary: '查找单个文章信息' })
  async findArticleByGather(@Query('id') id) {
    try {
      const res = await await this.articleModel.find(
        {
          gather: id,
          draft: 0,
        },
        {
          articleContent: 0,
          gather: 0,
          category: 0,
          tags: 0,
        },
      );
      return {
        code: 0,
        data: res,
        message: '获取成功',
      };
    } catch (error) {
      return {
        code: -1,
        data: error,
        message: '获取失败',
      };
    }
  }
}
