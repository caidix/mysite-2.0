import { Controller, Get, Query, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger'
import { ReturnModelType } from '@typegoose/typegoose'
import { InjectModel } from 'nestjs-typegoose';
import { Course } from 'libs/db/models/course.model';
import { Crud } from 'nestjs-mongoose-crud';
import { query } from 'express';

@Crud({
  model: Course
})
@Controller('courses')
@ApiTags('课程')
export class CoursesController {
  constructor(
    @InjectModel(Course) private readonly model: ReturnModelType<typeof Course>
  ) { }

  @Get('option')
  option() {
    return {
      title: "课程管理",
      column: [
        { prop: "name", label: "课程名称", sortable: true, search: true, regex: true, span: 24, row: true },
        { prop: "cover", label: "课程封面图", type: 'upload', width: 120, listType: 'picture-img', row: true, action: 'upload' }
      ]
    }
  }

  @Get('haha')
  async haha(@Query() query) {
    console.log(query)
    return await this.model.find().populate('episodes')
  }
}
