import { Get, ParseIntPipe } from '@nestjs/common';
import { Param } from '@nestjs/common';
import { Body, Controller, Post, Req, Head } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { Request } from 'express';

import { IResponse } from 'src/shared/interfaces/response';
import { ValidationPipe } from 'src/shared/pipes/validation-pipe';
import { LoginDto } from './dto/loginDto';
import { TokenService } from './providers/token.service';

@ApiTags('Autenticacion')
@Controller()
export class TokenController {
    constructor(private readonly tokenService: TokenService) { }

    @ApiOkResponse({ description: "Inicio de sesión", type: LoginDto })
    @ApiOperation({ summary: "Login de usuarios" })
    @Post('/login')
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

    @ApiOkResponse({ description: "Refrescar token" })
    @ApiOperation({ summary: "Refrescar token" })
    @ApiBearerAuth("JWT-auth")
    @Get('/refreshToken')
    async refresToken(
        @Req() req: Request,
    ): Promise<IResponse> {
        try {
            let token: string = req.headers.authorization.replace("Bearer ", "");
            let ipAddress: string = req.headers.host;

            return await this.tokenService.refrestToken(token, ipAddress);

        } catch (error) {
            throw error;
        }
    }

    @ApiOkResponse({ description: "Revocar token" })
    @ApiOperation({ summary: "Cerrar sesión" })
    @ApiBearerAuth("JWT-auth")
    @Get('/revokeToken')
    async revokeToken(
        @Req() req: Request,
    ): Promise<IResponse> {
        try {
            let token: string = req.headers.authorization.replace("Bearer ", "");
            return await this.tokenService.revokeToken(token);

        } catch (error) {
            throw error;
        }
    }

    @ApiOkResponse({ description: "Traer todas las sesiones" })
    @ApiOperation({ summary: "Consultar todas las sesiones disponibles" })
    @ApiBearerAuth("JWT-auth")
    @Get('/getAllTokens/:id')
    async getAllTokens(
        @Param('id', new ParseIntPipe()) idUser: number,
        @Req() req: Request,
    ): Promise<IResponse> {
        try {
            return await this.tokenService.getTokenForIdUser(idUser);

        } catch (error) {
            throw error;
        }
    }
}
