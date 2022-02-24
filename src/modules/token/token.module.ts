import { Module } from '@nestjs/common';
import { TokenController } from './token.controller';
import { TokenService } from './providers/token.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Token, User } from 'src/entities';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { SharedModule } from 'src/shared/shared.module';
import { JwtStrategy } from './providers/jwt-strategy';
import { JwtAuthGuard } from './providers/jwt-auth-guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([Token, User]),
    PassportModule,
    JwtModule.register({
      secret: "Hola-Precioso",
      signOptions: {
        algorithm: 'HS256',
        //expiresIn: "60s",
      },
      verifyOptions: {
        algorithms: ['HS256'],
        ignoreExpiration: false,
      }
    }),
    SharedModule
  ],
  controllers: [TokenController],
  providers: [TokenService, JwtStrategy, JwtAuthGuard],
  exports: [TypeOrmModule, TokenService, PassportModule, JwtModule]
})
export class TokenModule { }
