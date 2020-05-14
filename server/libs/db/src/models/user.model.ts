import { prop, modelOptions } from '@typegoose/typegoose';
import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { hashSync } from 'bcryptjs';

@modelOptions({ schemaOptions: { timestamps: true } })
export class User {
  @ApiProperty({ title: '用户名', example: 'admin' })
  @IsString()
  @prop({ required: true })
  username: string;

  @ApiProperty({ title: '密码', example: '123456' })
  @IsString()
  @prop({
    required: true,
    type: String,
    select: false,
    get(val) {
      return val;
    },
    set(val) {
      return val ? hashSync(val) : val;
    },
  })
  password: string;

  @ApiProperty({
    title: '用户类型',
    example: 0,
    description: '用户类型 1:拥有所有权限， 0 普通用户',
  })
  @prop({ default: 0 })
  type: Number;

  @prop()
  phone?: Number;

  @prop()
  img_url?: String;

  @prop()
  introduce?: String;

  @prop()
  avatar?: String;
}
