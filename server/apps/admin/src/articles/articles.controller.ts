import {
  Controller,
  Get,
  Param,
  Query,
  HttpException,
  Delete,
  Post,
  Body,
  Put,
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
    let { limit = 10, page = 1, skip = 0, all = false } = query,
      list = [];
    if (skip < 1) {
      skip = (page - 1) * limit;
    }
    if (all) {
      list = await this.model.find();
    } else {
      list = await this.model
        .find()
        .skip(skip)
        .limit(Number(limit));
    }
    const errors = { Article: ' not found' };
    const total = await this.model.countDocuments();
    if (!list) throw new HttpException({ errors }, 500);
    return {
      code: 0,
      data: { data: list, total },
      message: '获取文章列表成功',
    };
  }

  @Get('fuzzySearch')
  @ApiOperation({ summary: '标题索引查找' })
  async fuzzySearch(@Query() query) {
    let { title = '' } = query,
      where = {};
    if (title) {
      where['title'] = { $regex: new RegExp(title, 'i') };
    }
    const list = await this.model.find().where(where);
    return {
      code: 0,
      data: { data: list, total: list.length },
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
  async add(@Body() body) {
    try {
      const res = await this.model.create(body);
      console.log(res);
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

  @Put(':id')
  @ApiOperation({ summary: '修改文章' })
  async update(@Param('id') id: string, @Body() body) {
    try {
      const res = await this.model.findOneAndUpdate({ _id: id }, body, {
        new: true,
        upsert: false,
        runValidators: true,
      });
      return {
        code: 0,
        data: res,
        message: '修改成功',
      };
    } catch (error) {
      throw new HttpException(error, 400);
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
