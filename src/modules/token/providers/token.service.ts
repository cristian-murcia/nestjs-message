import { HttpException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';

import { Token, User } from 'src/entities';
import { IResponse } from 'src/shared/interfaces/response';
import { LoginDto } from '../dto/loginDto';
import { TokenDto } from '../dto/tokenDto';

@Injectable()
export class TokenService {

    constructor(
        @InjectRepository(Token) private readonly tokenRepository: Repository<Token>,
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        private jwtService: JwtService
    ) { }

    /**
     * Get token for idUser
     * @param idUser 
     * @returns 
     */
    public async getTokenForIdUser(idUser: number): Promise<IResponse> {
        try {
            let tokens: Array<Token> = await this.tokenRepository.find({ where: { idUser: idUser } });

            return {
                status: HttpStatus.OK,
                message: "Token consultados con éxito",
                result: tokens
            }

        } catch (error) {
            throw new InternalServerErrorException("Error interno consultando los tokens");
        }
    }

    /**
     * Actualizar token
     * @param token 
     * @param ipAddress 
     * @returns 
     */
    public async refrestToken(token: string, ipAddress: string): Promise<IResponse> {
        try {
            let user: any = this.jwtService.decode(token);
            delete user.iat;
            delete user.exp;

            let tokenActually: Token = await this.tokenRepository.findOne({ where: { idUser: user.id, token } });
            if (!tokenActually) throw new NotFoundException("Token no encontrado");

            let newToken: string = this.jwtService.sign({ ...user });

            const updateToken = new Token();
            updateToken.id = tokenActually.id;
            updateToken.idUser = user.id;
            updateToken.token = newToken;
            updateToken.ipAddress = ipAddress;
            updateToken.updatedAt = new Date();

            let tokenNew: Token = await this.tokenRepository.save(updateToken);

            if (tokenNew) {
                return {
                    status: HttpStatus.OK,
                    message: "Token actualizado con éxito",
                    result: tokenNew.token
                }
            }

            throw new NotFoundException("Token no encontrado");

        } catch (error) {
            if (error instanceof InternalServerErrorException)
                throw new InternalServerErrorException('Error interno mi rey');

            throw error;
        }
    }

    /**
     * Elminar / cerrar sesión
     * @param token  
     * @returns 
     */
    public async revokeToken(token: string): Promise<IResponse> {
        try {
            let user: any = this.jwtService.decode(token);

            let tokenActually: Token = await this.tokenRepository.findOne({ where: { idUser: user.id, token } });
            if (!tokenActually) throw new NotFoundException('No se ha encontrado el token');

            let deletedTokenActive = await this.tokenRepository.delete(tokenActually.id);
            if (!deletedTokenActive) throw new NotFoundException('No se ha encontrado el token');

            return {
                status: HttpStatus.OK,
                message: "Token eliminado con éxito"
            }

        } catch (error) {
            if (error instanceof InternalServerErrorException) {
                throw new InternalServerErrorException('Ha ocurrido un error interno, intente de nuevo');
            }
            throw error;
        }
    }

    /**
     * Login the users
     * @param login
     * @param ipAddres 
     * @returns 
     */
    public async login(login: LoginDto, ipAddres: string): Promise<IResponse> {
        try {
            let user: User = await this.userRepository.findOne({
                where: { email: login.email }
            });
            if (!user) throw new NotFoundException('El usuario no existe')

            let isValid: boolean = await user.comparatePassword(login.password);
            if (!isValid) throw new UnauthorizedException('Contraseña invalida');

            delete user.password;

            let token = new Token();
            token.idUser = user.id;
            token.token = this.jwtService.sign({ ...user });
            token.ipAddress = ipAddres;
            token.deletedAt = new Date();
            let result: Token = await this.tokenRepository.save(token);
            await this.deleteTokenExpired(user.id);

            return {
                status: HttpStatus.OK,
                message: 'Token creado con éxito',
                result: result.token
            } as IResponse;

        } catch (error) {
            if (error instanceof InternalServerErrorException)
                throw new InternalServerErrorException('Error interno mi rey');

            throw error;
        }
    }

    /**
     * Eliminar sesiones
     * @param idUser 
     */
    public async deleteTokenExpired(idUser: number): Promise<void> {
        try {
            let tokens: Array<Token> = await this.tokenRepository.find({ where: { idUser } });

            if (tokens.length > 0) {
                tokens.forEach(async (token) => {
                    try {
                        this.jwtService.verify(token.token);
                    } catch (error) {
                        await this.tokenRepository.delete(token.id);
                    }
                });
            }

        } catch (error) {
            throw new InternalServerErrorException("Error consultando los tokens disponibles del usuario")
        }
    }

}
