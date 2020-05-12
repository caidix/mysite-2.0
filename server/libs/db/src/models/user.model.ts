import { prop, modelOptions } from '@typegoose/typegoose';
import { IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';
@modelOptions(
  { schemaOptions: { timestamps: true } }
)
export class User {
  @ApiProperty({ title: '用户名', example: 'admin' })
  @IsString()
  @prop({ required: true })
  username: string

  @ApiProperty({ title: '密码', example: '123456' })
  @IsString()
  @prop()
  password: string
}