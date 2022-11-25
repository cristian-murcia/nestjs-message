import { Get, ParseIntPipe } from '@nestjs/common';
import { Param } from '@nestjs/common';
import { Body, Controller, Post, Req, Head } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { Request } from 'express';


import { IResponse } from 'src/shared/interfaces/response';
import { ValidationPipe } from 'src/shared/pipes/validation-pipe';
import { RecoverService } from './providers/recover.service';
import { ForgotPasswordDto } from './dto/forgotPasswordDto';


@ApiTags('Recover password')
@Controller()
export class RecoverController {
    constructor(private readonly recoverService: RecoverService) { }

    @ApiOkResponse({ description: "Recuperar contraseña", type: ForgotPasswordDto })
    @ApiOperation({ summary: "Olvide mi contraseña" })  
    @Post('/forgotPassword')
    async ForgotPassword(
        @Body(new ValidationPipe()) email: ForgotPasswordDto,
        @Req() req: Request,
    ): Promise<IResponse> {
        try {
            return await this.recoverService.consultEmail(email.email);

        } catch (error) {
            throw error;
        }
    }


}
