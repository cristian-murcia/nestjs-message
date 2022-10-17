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
    consumer
      .apply(AuthTokenMiddleware)
      .forRoutes('user');
  }
}
