import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { HttpExceptionFilter } from './exception/notFoundException';
import { ResponseInterceptor } from './interceptor/response.interceptor';

@Module({
    imports: [],
    exports: [],
    providers: [],
})
export class SharedModule { }
