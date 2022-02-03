import { IsInt, IsString } from 'class-validator';

export class UserDto {
  @IsInt()
  readonly id: number;

  @IsString()
  readonly name: string;

  @IsString()
  readonly email: string;
}
