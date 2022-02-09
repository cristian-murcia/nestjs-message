import { Module } from '@nestjs/common';
import { TokenController } from './token.controller';
import { TokenService } from './providers/token.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Token, User } from 'src/entities';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { SharedModule } from 'src/shared/shared.module';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from 'src/shared/exception/notFoundException';

@Module({
  imports: [
    TypeOrmModule.forFeature([Token, User]),
    JwtModule.register({
      secret: "HolaPrecioso"
    }),
    PassportModule.register({ defaultStrategy: "jwt" }),
    SharedModule
  ],
  controllers: [TokenController],
  providers: [
    TokenService
  ],
  exports: [TypeOrmModule, TokenService]
})
export class TokenModule { }
