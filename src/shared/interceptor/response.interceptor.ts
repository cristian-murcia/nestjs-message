import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Response } from "express";
import { map, Observable, tap } from "rxjs";

import { IResponse } from '../../shared/interfaces/response';


@Injectable()
export class ResponseInterceptor implements NestInterceptor {

  intercept(context: ExecutionContext, next: CallHandler): Observable<IResponse> {
    let response: Response = context.switchToHttp().getResponse<Response>();

    return next.handle()
      .pipe(
        map((data: IResponse) => {
          response.status(data.status ?? context.switchToHttp().getResponse().statusCode);

          return {
            status: data.status ?? context.switchToHttp().getResponse().statusCode,
            message: data.message,
            error: data?.error ?? null,
            result: data?.result ?? null
          } as IResponse;
        })
      );
  }
}
