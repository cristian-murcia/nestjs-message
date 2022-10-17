import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { AbstractEntity } from "./abstract.entity";
import { User } from "./user.entity";


@Entity('token')
export class Token extends AbstractEntity {
    
    @Column({length: 500})
    token: string;

    @ManyToOne(
        type => User,
        user => user.id
    )
    idUser: number;

    @Column()
    deletedAt: Date;

    @Column()
    ipAddress: string;
}