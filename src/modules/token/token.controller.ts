import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { ValidationPipe } from 'src/shared/pipes/validation-pipe';
import { LoginDto } from './dto/loginDto';
import { TokenService } from './providers/token.service';

@ApiTags('Autenticacion')
@Controller('authentication')
export class TokenController {
    constructor(private readonly tokenService: TokenService) { }

    @ApiOkResponse({ description: "Inicio de sesión", type: LoginDto })
    @ApiOperation({ summary: "Login de usuarios" })
    @ApiBearerAuth('jwt-token')
    @Post()
    async login(
        @Body(new ValidationPipe()) login: LoginDto,
        @Req() req: Request,
        @Res() res: Response,
    ): Promise<void> {
        try {
            let ipAddress: string = req.headers.host;
            let result = await this.tokenService.login(login, ipAddress);
            res.status(result.status).send(result);

        } catch (error) {
            throw error;
        }
    }
}
