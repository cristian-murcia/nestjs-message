import { ISendMailOptions, MailerService } from '@nestjs-modules/mailer';
import { Injectable, HttpStatus, InternalServerErrorException } from '@nestjs/common';

import { IResponse } from '../../../shared/interfaces/response';

@Injectable()
export class MailerProviders {

    constructor(
        private readonly mailerService: MailerService
    ) { }

    /**
     * Envio de correo electronico
     * @param destino 
     * @param message 
     * @param subject 
     * @returns 
     */
    public async sendPassword(destino: string, message: string, subject: string): Promise<IResponse> {
        try {
            let data: ISendMailOptions = {
                to: destino,
                from: 'noreply@nestjs.com',
                subject,
                //text: ' 123456879', // plaintext body
                html: message
            }

            await this.mailerService.sendMail(data);
            return {
                status: HttpStatus.OK,
                message: "Correo enviado con éxito"
            };
        } catch (error) {
            throw new InternalServerErrorException("Ocurrio un error al enviar el correo de recuperación");
        }
    }


}
