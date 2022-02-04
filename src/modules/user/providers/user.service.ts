import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IResponse } from 'src/shared/interfaces/response';
import { DeleteResult, Repository } from 'typeorm';
import { UserDto } from '../dto/userDto';
import { User } from '../entities/user.entity';

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
    public async getAllUser(): Promise<User[]> {
        try {
            return this.userRepository.find();

        } catch (error) {
            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: error,
                message: 'Ha ocurrido un error interno, intente de nuevo'
            } as IResponse, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Get user for id
     * @returns 
     */
    public async getUserForId(id: number): Promise<User> {
        try {
            return await this.userRepository.findOne(id);

        } catch (error) {
            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: error,
                message: 'Ha ocurrido un error interno, intente de nuevo'
            } as IResponse, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Create user 
     * @param data UserDto
     * @returns 
     */
    public async createUser(data: UserDto): Promise<User> {
        try {
            const user = new User;
            user.email = data.email;
            user.name = data.name;
            let userCreated = await this.userRepository.save(user);
            return userCreated

        } catch (error) {

            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: error,
                message: 'Ha ocurrido un error interno, intente de nuevo'
            } as IResponse, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Create user 
     * @param data UserDto
     * @returns 
     */
    public async updateUser(id: number, data: UserDto): Promise<User> {
        try {
            const user = new User;
            user.id = id;
            user.email = data.email;
            user.name = data.name;
            let userCreated = await this.userRepository.save(user);
            return userCreated

        } catch (error) {

            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: error,
                message: 'Ha ocurrido un error interno, intente de nuevo'
            } as IResponse, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Delete user
     * @param id 
     * @returns 
     */
    public async deleteUserForId(id: number): Promise<DeleteResult> {
        try {
            let user = await this.userRepository.delete(id);
            return user;

        } catch (error) {
            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: error,
                message: 'Ha ocurrido un error interno, intente de nuevo'
            } as IResponse, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
