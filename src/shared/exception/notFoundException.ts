import {
    ExceptionFilter, Catch, ArgumentsHost,
    HttpException, NotFoundException, UnauthorizedException,
    BadRequestException, InternalServerErrorException
} from '@nestjs/common';
import { Response } from 'express';

import { IResponse } from '../interfaces/response';

@Catch(HttpException, NotFoundException, UnauthorizedException, BadRequestException, InternalServerErrorException)
export class HttpExceptionFilter implements ExceptionFilter {

    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const status = exception.getStatus();
        const exceptionResponse: any = exception.getResponse();

        response
            .status(status)
            .json({
                status: status,
                error: exceptionResponse.error,
                message: exceptionResponse.message,
                result: null
            } as IResponse);
    }
}