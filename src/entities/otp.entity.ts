import { classToPlain, Exclude } from 'class-transformer';
import { BeforeInsert, Column, Entity, ManyToOne, PrimaryGeneratedColumn, } from 'typeorm';

import { AbstractEntity } from './abstract.entity';
import { UserDto } from 'src/modules/user/dto/userDto';
import { User } from './user.entity';

@Entity('otp')
export class Otp extends AbstractEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 4 })
    code: string;

    @ManyToOne(
        type => User,
        user => user.id
    )
    idUser: number;

}
