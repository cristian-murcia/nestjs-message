import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

import { User } from '../entities/user.entity';

@Injectable()
export class DatabaseConnectionService implements TypeOrmOptionsFactory {

    createTypeOrmOptions(): TypeOrmModuleOptions {
        return {
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: '',
            database: 'pruebaNest',
            synchronize: true, //true for create
            dropSchema: true,
            entities: [User],
        } as TypeOrmModuleOptions;
    }
}
