import { Injectable, NestMiddleware } from '@nestjs/common';
import { v1 as uuidv1 } from 'uuid';
@Injectable()
export class CookieMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    console.log('hello蔡迪中间件', req);
    let { uuid } = req.cookies;
    if (!uuid) {
      uuid = uuidv1();
      res.cookie('uuid', uuid, {
        expires: new Date(Date.now() + 604800000),
      });
    }
    // req.query.uuid = uuid;
    next();
  }
}
