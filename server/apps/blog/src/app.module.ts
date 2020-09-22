import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { CommonModule } from '@app/common';
import { AppService } from './app.service';
import { DbModule } from 'libs/db';
import { ApiModule } from './api/api.module';
import { CookieMiddleware } from './cookie.middleware';
@Module({
  imports: [CommonModule, DbModule, ApiModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  // cookie中间件，暂时废弃
  // configure(consumer: MiddlewareConsumer) {
  //   consumer
  //     .apply(CookieMiddleware)
  //     .forRoutes({ path: 'site/find?*', method: RequestMethod.ALL });
  // }
}
