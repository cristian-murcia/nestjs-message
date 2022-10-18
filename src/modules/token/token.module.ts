import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { Token, User } from 'src/entities';
import { SharedModule } from 'src/shared/shared.module';
import { TokenController } from './token.controller';
import { TokenService } from './providers/token.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Token, User]),
    PassportModule,
    JwtModule.register({
      secret: "Hola-Precioso",
      signOptions: {
        algorithm: 'HS256',
        expiresIn: "2d",
      },
      verifyOptions: {
        algorithms: ['HS256'],
        ignoreExpiration: false
      }
    }),
    SharedModule
  ],
  controllers: [TokenController],
  providers: [TokenService],
  exports: [TypeOrmModule, TokenService, PassportModule, JwtModule]
})
export class TokenModule { }
