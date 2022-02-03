/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { configDataDev } from './database/config';
import { UserModule } from './modules/user/user.module';
import { SharedModule } from './shared/shared.module';
import { User } from './modules/user/entities/user.entity';
import { UserService } from './modules/user/providers/user.service';
import { UserController } from './modules/user/user.controller';

@Module({
  imports: [
    UserModule,
    SharedModule,
    TypeOrmModule.forRoot({ ...configDataDev, entities: [User], autoLoadEntities: true })
  ],
  controllers: [AppController, UserController],
  providers: [AppService, UserService],
})
export class AppModule { }
