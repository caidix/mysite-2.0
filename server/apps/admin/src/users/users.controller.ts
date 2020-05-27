import {
  Controller,
  Get,
  Post,
  Query,
  Body,
  Put,
  Param,
  HttpException,
  Delete,
} from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { User } from 'libs/db/models/user.model';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ReturnModelType } from '@typegoose/typegoose';
@Controller('users')
@ApiTags('用户')
export class UsersController {
  constructor(
    @InjectModel(User) private readonly model: ReturnModelType<typeof User>,
  ) {}
  @Get()
  @ApiOperation({ summary: '用户列表' })
  async list(@Query() query) {
    let { limit = 10, page = 1, skip = 0 } = query;
    if (skip < 1) {
      skip = (page - 1) * limit;
    }
    const data = await this.model
      .find()
      .skip(skip)
      .limit(Number(limit));
    const total = await this.model.countDocuments();
    return {
      code: 0,
      data: { data, total },
      message: '获取用户列表成功',
    };
  }

  @Post('register')
  @ApiOperation({ summary: '注册' })
  async register(@Body() dto: User) {
    const { username, password } = dto;
    const result = await this.model.find({ username });
    if (result && result.length > 0) {
      return {
        code: -1,
        data: '',
        message: '已有联系人!',
      };
    }
    const user = await this.model.create({
      ...dto,
    });
    return {
      code: 0,
      data: user,
      message: '注册成功!',
    };
  }

  @Put(':id')
  @ApiOperation({ summary: '修改信息' })
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
