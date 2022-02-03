import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDto } from '../dto/userDto';
import { User } from '../entities/user.entity';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }

    public async getAllUser(): Promise<User[]> {
        return this.userRepository.find();
    }

    public async createUser(data: UserDto): Promise<User> {
        const user = new User;
        user.email = data.email;
        user.name = data.name;
        let res = await this.userRepository.save(data);
        console.log(res);
        return res;
        
    }
}
