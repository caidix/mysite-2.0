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
import { InjectModel } from 'nestjs-typegoose';
import { Tag } from 'libs/db/models/blog/tags.model';
import { ReturnModelType } from '@typegoose/typegoose';
import { ApiTags, ApiQuery, ApiOperation } from '@nestjs/swagger';
import { QueryDto } from '../articles/dto/articles.dto';
import { createTag } from './tags.dto';

@Controller('admin/tags')
@ApiTags('标签')
export class TagsController {
  constructor(
    @InjectModel(Tag) private readonly model: ReturnModelType<typeof Tag>,
  ) {}

  @Get()
  @ApiOperation({ summary: '获取标签列表' })
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
    const total = await this.model.countDocuments();
    if (!list)
      throw new HttpException(
        { data: list, message: '获取失败', code: -1 },
        400,
      );
    return {
      code: 0,
      data: { data: list, total },
      message: '获取标签列表成功',
    };
  }

  @Post()
  @ApiOperation({ summary: '创建标签列表' })
  async create(@Body() body) {
    const { name } = body;
    try {
      const res = await this.model.find({ name });
      if (res && res.length > 0) {
        return {
          code: -1,
          data: res,
          message: '已存在该标签',
        };
      }
      const data = await this.model.create({...body});
      if (data) {
        return {
          code: 0,
          data: data,
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
  @ApiOperation({ summary: '修改标签' })
  async update(@Param('id') id: string, @Body() body: createTag) {
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
  @ApiOperation({ summary: 'Delete a record' })
  async delete(@Param('id') id: string) {
    try {
      const res = await this.model.findOneAndRemove({ _id: id });
      return {
        code: 0,
        data: res,
        message: '删除成功',
      };
    } catch (error) {
      throw new HttpException(error, 400);
    }
  }
}
