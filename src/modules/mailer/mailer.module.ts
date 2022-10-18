import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

import { Mailer } from './providers/mailer';
import { MailerController } from './mailer.controller';
import { SharedModule } from '../../shared/shared.module';

@Module({
    imports: [
        MailerModule.forRoot({
            transport: {
                host: 'smtp.mailtrap.io',
                port: 465,
                ignoreTLS: true,
                secure: false,
                auth: {
                    user: "e189e7af111940", //process.env.MAILDEV_INCOMING_USER,
                    pass: "7dbba09943dc86", //process.env.MAILDEV_INCOMING_PASS,
                },
            },
            defaults: {
                from: '"No Reply" <no-reply@localhost>',
            },
            preview: true,
            template: {
                dir: process.cwd() + '/template/',
                adapter: new HandlebarsAdapter(), // or new PugAdapter() or new EjsAdapter()
                options: {
                    strict: true,
                },
            },
        }),
        SharedModule
    ],
    providers: [Mailer],
    controllers: [MailerController],
    exports: [MailerModule]
})
export class NodeMailerModule { }
