import { Post, Body, Req, Controller } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { Mailer } from './providers/mailer';
import { ValidationPipe } from '../../shared/pipes/validation-pipe';
import { RecoverPasswordDto } from './dto/recover-passwordDto';
import { IResponse } from '../../shared/interfaces/response';

@ApiTags('Recuperación de contraseña')
@Controller()
export class MailerController {

    constructor(private readonly mailer: Mailer) { }

    @ApiOkResponse({ description: "Recuperar contraseña", type: RecoverPasswordDto })
    @ApiOperation({ summary: "Genera un código otp" })
    @Post('/recoverPassword')
    async login(
        @Body(new ValidationPipe()) login: RecoverPasswordDto,
        @Req() req: Request,
    ): Promise<IResponse> {
        try {
            return await this.mailer.sendPassword();

        } catch (error) {
            throw error;
        }
    }

}
