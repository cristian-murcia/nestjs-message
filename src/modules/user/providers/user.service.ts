import { HttpException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';

import { UserDto } from '../dto/userDto';
import { User } from '../../../entities/user.entity';
import { IResponse } from 'src/shared/interfaces/response';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }

    /**
     * Get all user
     * @returns 
     */
    public async getAllUser(): Promise<IResponse> {
        try {
            let users: Array<User> = await this.userRepository.find();

            return {
                status: HttpStatus.OK,
                message: "Usuarios consultados con éxito",
                error: null,
                result: users
            }

        } catch (error) {
            throw new InternalServerErrorException('Ha ocurrido un error interno, intente de nuevo');
        }
    }

    /**
     * Get user for id
     * @returns 
     */
    public async getUserForId(id: number): Promise<IResponse> {
        try {
            let user: User = await this.userRepository.findOne(id);

            if (user) {
                return {
                    status: HttpStatus.OK,
                    message: "Usuario consultado con éxito",
                    error: null,
                    result: user
                }
            } else {
                throw new NotFoundException('El usuario no existe')
            }

        } catch (error) {
            throw new InternalServerErrorException('Ha ocurrido un error interno, intente de nuevo');
        }
    }

    /**
     * Create user 
     * @param data UserDto
     * @returns 
     */
    public async createUser(data: UserDto): Promise<IResponse> {
        try {
            const user = new User;
            user.email = data.email;
            user.name = data.name;
            user.password = data.password;
            let userCreated = await this.userRepository.save(user);

            return {
                status: HttpStatus.OK,
                message: "Usuario creado con éxito",
                error: null,
                result: userCreated
            }

        } catch (error) {
            throw new InternalServerErrorException('Ha ocurrido un error interno, intente de nuevo');
        }
    }

    /**
     * Create user 
     * @param data UserDto
     * @returns 
     */
    public async updateUser(id: number, data: UserDto): Promise<IResponse> {
        try {
            const user = new User;
            user.id = id;
            user.email = data.email;
            user.name = data.name;
            let userCreated = await this.userRepository.save(user);

            return {
                status: HttpStatus.OK,
                message: "Usuario actualizado con éxito",
                error: null,
                result: userCreated
            }

        } catch (error) {
            throw new InternalServerErrorException('Ha ocurrido un error interno, intente de nuevo');
        }
    }

    /**
     * Delete user
     * @param id 
     * @returns 
     */
    public async deleteUserForId(id: number): Promise<IResponse> {
        try {
            let { affected } = await this.userRepository.delete(id);

            if (affected > 0) {
                return {
                    status: HttpStatus.OK,
                    message: "Usuario eliminado con éxito",
                    error: null,
                    result: null
                }
            } else {
                throw new NotFoundException('No se ha encontrado el ususario')
            }

        } catch (error) {

            if (error instanceof InternalServerErrorException) {
                throw new InternalServerErrorException('Ha ocurrido un error interno, intente de nuevo');
            } else {
                throw error
            }
        }
    }
}
