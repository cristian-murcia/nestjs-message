import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const configDataDev = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'pruebaNest',
  synchronize: false, //true for create
} as TypeOrmModuleOptions;
