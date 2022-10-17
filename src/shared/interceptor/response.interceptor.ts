import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { map, Observable } from "rxjs";

import { IResponse } from '../../shared/interfaces/response';


@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    
    return next.handle().pipe(map((data: IResponse) => {
      return {
        status: context.switchToHttp().getResponse().statusCode,
        message: data.message,
        error: data?.error ?? null,
        result: data?.result ?? null
      } as IResponse
    }));
  }
}
