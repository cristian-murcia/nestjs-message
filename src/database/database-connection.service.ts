import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

import { User, Token } from '../entities';

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
            synchronize: false, //true for create
            dropSchema: false,
            entities: [User, Token],
        } as TypeOrmModuleOptions;
    }
}
