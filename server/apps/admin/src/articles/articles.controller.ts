import {
  Controller,
  Get,
  Param,
  Query,
  HttpException,
  Delete,
  Post,
  Body,
} from '@nestjs/common';
import { Article } from '../../../../libs/db/src/models/blog/articles.model';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { QueryDto } from './dto/articles.dto';

@Controller('admin/articles')
@ApiTags('文章')
export class ArticlesController {
  constructor(
    @InjectModel(Article)
    private readonly model: ReturnModelType<typeof Article>,
  ) {}

  @Get()
  @ApiOperation({ summary: '获取文章列表' })
  @ApiQuery({
    name: 'query',
    type: String,
    required: false,
    description: 'Query options',
  })
  async list(@Query() query: QueryDto) {
    let { limit = 10, page = 1, skip = 0 } = query;
    if (skip < 1) {
      skip = (page - 1) * limit;
    }
    const list = await this.model
      .find()
      .skip(skip)
      .limit(Number(limit));
    const errors = { Article: ' not found' };
    const total = await this.model.countDocuments();
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
      const res = await this.model.findById(id);
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

  @Post()
  @ApiOperation({ summary: '添加文章' })
  async add(@Body() body: Object) {
    try {
      const res = await this.model.create({ ...body });
      console.log(res)
      if (res) {
        return {
          code: 0,
          data: res,
          message: '添加成功',
        };
      }
    } catch (error) {
      return {
        code: -1,
        data: error,
        message: '添加失败',
      };
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除文章' })
  async delete(@Param('id') id: String) {
    const res = await this.model.findByIdAndRemove(id);
    if (res) {
      return {
        code: 0,
        message: '删除成功',
      };
    } else {
      return {
        code: -1,
        message: '删除失败',
      };
    }
  }
}
