import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UserDto {
  
  readonly id: number;

  @IsString({
    message: 'El Name debe ser un string',
  })
  @IsNotEmpty({
    message: 'El Name no puede estar vacio',
  })
  readonly name: string;

  @IsString({
    message: 'Email debe ser un string',
  })
  @IsNotEmpty({
    message: 'El email no puede estar vacio',
  })
  @IsEmail({}, {
    message: 'El email no es un correo valido'
  })
  readonly email: string;
}
