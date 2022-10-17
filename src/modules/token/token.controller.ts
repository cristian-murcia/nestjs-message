import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { Request} from 'express';

import { IResponse } from 'src/shared/interfaces/response';
import { ValidationPipe } from 'src/shared/pipes/validation-pipe';
import { LoginDto } from './dto/loginDto';
import { TokenService } from './providers/token.service';

@ApiTags('Autenticacion')
@Controller('authentication')
export class TokenController {
    constructor(private readonly tokenService: TokenService) { }

    @ApiOkResponse({ description: "Inicio de sesión", type: LoginDto })
    @ApiOperation({ summary: "Login de usuarios" })
    @Post()
    async login(
        @Body(new ValidationPipe()) login: LoginDto,
        @Req() req: Request,
    ): Promise<IResponse> {
        try {
            let ipAddress: string = req.headers.host;
            return await this.tokenService.login(login, ipAddress);
            
        } catch (error) {
            throw error;
        }
    }
}
