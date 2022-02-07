import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber, IsString, MaxLength, MinLength } from 'class-validator';

export class UserDto {

  readonly id: number;

  @IsString()
  @MinLength(4)
  @MaxLength(50)
  @ApiProperty()
  readonly name: string;

  @IsString()
  @IsEmail()
  @MinLength(10)
  @MaxLength(255)
  @ApiProperty()
  readonly email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(30)
  @ApiProperty()
  password: string;


}
