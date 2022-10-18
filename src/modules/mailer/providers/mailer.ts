import { ISendMailOptions, MailerService } from '@nestjs-modules/mailer';
import { Injectable, HttpStatus } from '@nestjs/common';

import { IResponse } from '../../../shared/interfaces/response';

@Injectable()
export class Mailer {

    constructor(
        private readonly mailerService: MailerService
    ) { }

    public async sendPassword(): Promise<IResponse> {
        let data: ISendMailOptions = {
            to: 'test@nestjs.com', // list of receivers
            from: 'noreply@nestjs.com', // sender address
            subject: 'Testing Nest MailerModule ✔', // Subject line
            text: 'welcome', // plaintext body
            html: '<b>welcome</b>', // HTML body content
        }

        this.mailerService.sendMail(data).then((data) => {
            console.log("llego: ", data);

        }).catch(error => {
            console.log("error: ", error);
            
        });

        return {
            status: HttpStatus.ACCEPTED,
            message: "Correo enviado"
        } as IResponse;
    }

}
