import { ApiProperty } from "@nestjs/swagger";
import { IsEmail } from "class-validator";


export class RecoverPasswordDto {

    @IsEmail()
    @ApiProperty()
    readonly email: string;
}