import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

import { TokenService } from 'src/modules/token/providers/token.service';

@Injectable()
export class AuthTokenMiddleware implements NestMiddleware {

  constructor(private readonly tokenService: TokenService) { }

  use(req: Request, res: Response, next: NextFunction) {
    console.log(1, 'middleware', req.headers);
    next();
  }
}
