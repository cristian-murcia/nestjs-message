import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DatabaseConnectionService } from './database/database-connection.service';

import { UserModule } from './modules/user/user.module';
import { TokenModule } from './modules/token/token.module';
import { SharedModule } from './shared/shared.module';
import { AuthTokenMiddleware } from './shared/middleware/auth-token.middleware';
import { HttpExceptionFilter } from './shared/exception/notFoundException';
import { ResponseInterceptor } from './shared/interceptor/response.interceptor';
import { RouteInfo } from '@nestjs/common/interfaces';
import { RequestMethod } from '@nestjs/common';

@Module({
  imports: [
    UserModule,
    SharedModule,
    TypeOrmModule.forRootAsync({
      useClass: DatabaseConnectionService
    }),
    TokenModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor
    }
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {

    let routes: Array<RouteInfo> = [
      {
        path: "/user",
        method: RequestMethod.GET
      },
      {
        path: "/user",
        method: RequestMethod.PUT
      },
      {
        path: "/user/?",
        method: RequestMethod.DELETE
      },
      {
        path: "/refreshToken",
        method: RequestMethod.GET
      }
    ]

    consumer.apply(AuthTokenMiddleware).forRoutes(...routes);
  }
}
