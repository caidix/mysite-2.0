import { Controller, Post, Get, Req, Body, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { User } from 'libs/db/models/user.model';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType, DocumentType } from '@typegoose/typegoose';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from './current-user.decorator';

@Controller('auth')
export class AuthController {
  constructor(
    private jwtService: JwtService,
    @InjectModel(User) private userModel: ReturnModelType<typeof User>,
  ) {}
  @Post('register')
  @ApiOperation({ summary: '注册' })
  async register(@Body() dto: User) {
    const { username, password } = dto;
    const result = await this.userModel.find({ username });
    if (result && result.length > 0) {
      return {
        code: -1,
        data: '',
        message: '已有联系人!',
      };
    }
    const user = await this.userModel.create(dto);
    return {
      code: 0,
      data: user,
      message: '注册成功!',
    };
  }

  @Post('login')
  @ApiOperation({ summary: '登录' })
  @UseGuards(AuthGuard('local'))
  async login(@Body() dto: LoginDto, @CurrentUser() user: DocumentType<User>) {
    return {
      code: 0,
      message: '登陆成功',
      data: {
        token: this.jwtService.sign(String(user._id)),
      },
    };
  }

  @Get('user')
  @ApiOperation({ summary: '获取个人信息' })
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  async user(@CurrentUser() user: DocumentType<User>) {
    return {
      code: 0,
      message: 'get myself message',
      data: user,
    };
  }
}
