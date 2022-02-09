import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './exception/notFoundException';

@Module({
    imports: [],
    exports: [],
    providers: [],
})
export class SharedModule { }
