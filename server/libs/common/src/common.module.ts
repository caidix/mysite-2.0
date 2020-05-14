import { Module, Global } from '@nestjs/common';
import { CommonService } from './common.service';
import { ConfigModule } from '@nestjs/config';
import { DbModule } from 'libs/db';
import { JwtModule } from '@nestjs/jwt';
/**
 * 用于注入环境变量
 */
@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      // 实现环境变量全局化
      isGlobal: true,
    }),
    JwtModule.registerAsync({
      useFactory() {
        return {
          secret: process.env.SECRET,
        };
      },
    }),
    DbModule,
  ],
  providers: [CommonService],
  exports: [CommonService, JwtModule],
})
export class CommonModule {}
