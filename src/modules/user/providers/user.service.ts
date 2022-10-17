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
            let user: User = await this.userRepository.findOne({ where: { id } });

            if (!user)
                throw new NotFoundException('El usuario no existe');

            return {
                status: HttpStatus.OK,
                message: "Usuario consultado con éxito.",
                result: user
            }

        } catch (error) {
            if (error instanceof InternalServerErrorException) {
                throw new InternalServerErrorException('Ha ocurrido un error interno, intente de nuevo');
            }

            throw error
        }
    }

    /**
     * Create user 
     * @param data UserDto
     * @returns 
     */
    public async createUser(data: UserDto): Promise<IResponse> {
        try {
            let existUser: User = await this.userRepository.findOne({
                where: {
                    email: data.email
                }
            });

            if (existUser)
                return { status: HttpStatus.OK, message: "El usuario ya existe con ese correo" }

            const user = new User;
            user.email = data.email;
            user.name = data.name;
            user.password = data.password;
            let userCreated: User = await this.userRepository.save(user);

            return {
                status: HttpStatus.OK,
                message: "Usuario creado con éxito",
                result: userCreated
            }

        } catch (error) {
            throw new InternalServerErrorException('Ha ocurrido un error interno, intente de nuevo');
        }
    }

    /**
     * Actualizar usuario
     * @param id 
     * @param data 
     * @returns 
     */
    public async updateUser(id: number, data: UserDto): Promise<IResponse> {
        try {

            let existUser: User = await this.userRepository.findOne({
                where: {
                    id
                }
            });

            if (!existUser)
                throw new NotFoundException("No existe el usuario con dichas caracteristicas");

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
            if (error instanceof InternalServerErrorException) {
                throw new InternalServerErrorException('Ha ocurrido un error interno, intente de nuevo');
            }

            throw error
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
                    message: `Usuario con id ${id} eliminado con éxito`
                }
            }

            throw new NotFoundException(`No se ha encontrado el ususario con id: ${id}`)

        } catch (error) {
            if (error instanceof InternalServerErrorException) {
                throw new InternalServerErrorException('Ha ocurrido un error interno al eliminar un usuario, intente de nuevo');
            }

            throw error;
        }
    }
}
