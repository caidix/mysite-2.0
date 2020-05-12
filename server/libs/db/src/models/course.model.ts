import { prop, modelOptions, arrayProp, Ref } from '@typegoose/typegoose';
import { IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';
import { Episode } from './episode.model'
@modelOptions(
  { schemaOptions: { timestamps: true } }
)
export class Course {
  @ApiProperty({ title: '标题', example: '我来了', description: '课程名称' })
  @IsString()
  @prop({ required: true })
  username: string

  @ApiProperty({ title: '封面', description: '封面图' })
  @IsString()
  @prop()
  cover: string

  @ApiProperty({ description: '哈哈' })
  @arrayProp({
    ref: 'Episode',
    localField: '_id',
    foreignField: 'course',
  })
  episodes: Ref<Episode>[]
}