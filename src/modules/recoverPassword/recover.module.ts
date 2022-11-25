import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Otp } from '../../entities/otp.entity';
import { User } from '../../entities/user.entity';
import { RecoverController } from './recover.controller';
import { RecoverService } from './providers/recover.service';
import { MailerProviders } from '../mailer/providers/mailer';
import { NodeMailerModule } from '../mailer/mailer.module';

@Module({
  imports: [TypeOrmModule.forFeature([Otp, User]), NodeMailerModule],
  providers: [RecoverService, MailerProviders],
  controllers: [RecoverController],
  exports: [TypeOrmModule]
})
export class RecoverModule { }
