import { classToPlain, Exclude } from 'class-transformer';
import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn, } from 'typeorm';
import * as bcrypt from 'bcryptjs';

import { AbstractEntity } from './abstract.entity';
import { UserDto } from 'src/modules/user/dto/userDto';
import { Token } from './token.entity';

@Entity('user')
export class User extends AbstractEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude()
  password: string;

  @OneToMany(
    type => Token,
    token => token.idUser
  )
  tokens: Token[]

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  async comparatePassword(attempt: string) {
    return await bcrypt.compare(attempt, this.password);
  }

  toJSON(): UserDto {
    return <UserDto>classToPlain(this);
  }
}
