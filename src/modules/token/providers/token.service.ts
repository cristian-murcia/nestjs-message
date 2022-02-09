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
    public async getTokenForId(idUser: number): Promise<Array<Token>> {
        try {
            return await this.tokenRepository.find({
                where: {
                    idUser
                }
            });
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: error,
                message: 'Ha ocurrido un error interno, intente de nuevo'
            } as IResponse, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Save token
     * @param token 
     * @returns 
     */
    public async saveToken(token: TokenDto): Promise<Token> {
        try {
            const createToken = new Token();
            createToken.idUser = token.idUser;
            createToken.token = token.token;
            createToken.ipAddress = token.ipAddress;
            createToken.deletedAt = new Date();

            return await this.tokenRepository.save(createToken);

        } catch (error) {
            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: error,
                message: 'Ha ocurrido un error interno, intente de nuevo'
            } as IResponse, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Revoke token of user
     * @param idUser 
     * @param ipAddres 
     * @returns 
     */
    public async revokeToken(idUser: number, ipAddres: string): Promise<Token> {
        try {
            let tokenActive = await this.tokenRepository.findOne({
                where: {
                    idUser: idUser,
                    ipAddress: ipAddres
                }
            });

            if (tokenActive) {
                await this.tokenRepository.delete(tokenActive.id);
                return tokenActive;
            }

            throw new NotFoundException({
                status: HttpStatus.NOT_FOUND,
                error: null,
                message: 'No se ha encontrado el token'
            } as IResponse);

        } catch (error) {
            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: error,
                message: 'Ha ocurrido un error interno, intente de nuevo'
            } as IResponse, HttpStatus.INTERNAL_SERVER_ERROR);
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

            if (!user) {
                throw new NotFoundException('El usuario no existe')
            }

            let isValid: boolean = await user.comparatePassword(login.password);
            if (!isValid) {
                throw new UnauthorizedException('Contraseña invalida');
            }

            let token = new Token();
            token.idUser = user.id;
            token.token = this.jwtService.sign(JSON.stringify(user));
            token.ipAddress = ipAddres;
            token.deletedAt = new Date();

            let response = await this.tokenRepository.save(token);

            return {
                status: HttpStatus.OK,
                error: null,
                message: 'Token creado con éxito',
                result: response
            } as IResponse;

        } catch (error: any) {
            if(error instanceof InternalServerErrorException){
                throw new InternalServerErrorException('Error interno mi rey');
            } else {
                throw error;
            }
        }
    }

}
