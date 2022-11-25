import { ConflictException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import newOTP from 'otp-generators';

import { Otp, User } from 'src/entities';
import { MailerProviders } from 'src/modules/mailer/providers/mailer';
import { IResponse } from 'src/shared/interfaces/response';

import { forgotPasswordHtml } from '../html/forgotPassword.html';

@Injectable()
export class RecoverService {

    constructor(
        @InjectRepository(Otp)
        private readonly otpRepository: Repository<Otp>,

        @InjectRepository(User)
        private readonly userRepository: Repository<User>,

        private mailerProviders: MailerProviders
    ) { }

    /**
     * Consulting email if exist generate otp and send email
     * @param email 
     */
    public async consultEmail(email: string): Promise<IResponse> {
        try {
            let existEmail: User = await this.userRepository.findOne({ where: { email } });

            if (!existEmail) throw new NotFoundException(`No existe un usuario con dicho email`);

            let otp: string = newOTP.generate(4, { alphabets: false, upperCase: false, specialChar: false });
            let newOtp: Otp = new Otp();
            newOtp.idUser = existEmail.id;
            newOtp.code = otp;

            let otpCreate: Otp = await this.otpRepository.save(newOtp);

            if (!otpCreate) throw new ConflictException(`Error al guardar el Otp`);
            
            let messageHtml: string = forgotPasswordHtml.replace("[NOMBRE]", existEmail.name).replace("[OTP]", newOtp.code);
            let result: IResponse = await this.mailerProviders.sendPassword(existEmail.email, messageHtml, "Recuperación de contraseña");

            if (result.status === HttpStatus.OK) result.message = "Se ha enviado el correo electronico de recuperación ";
            return result;

        } catch (error) {
            if (error instanceof InternalServerErrorException) {
                throw new InternalServerErrorException('Ha ocurrido un error interno al consultar el email, intente de nuevo');
            }

            throw error;
        }
    }

}
