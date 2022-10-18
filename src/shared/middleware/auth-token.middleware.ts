import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AuthTokenMiddleware implements NestMiddleware {

  constructor(private readonly jwtService: JwtService) { }

  use(req: Request, res: Response, next: NextFunction) {

    try {
      let token: string = req.headers.authorization.replace("Bearer ", "");
      this.jwtService.verify(token);
      next();

    } catch (error) {
      throw new UnauthorizedException("Token invalido");
    }
  }
}
