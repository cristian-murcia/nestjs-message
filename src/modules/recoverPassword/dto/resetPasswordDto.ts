import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNumber, IsString } from "class-validator";


export class ResetPasswordDto {

    @IsEmail()
    @ApiProperty()
    readonly email: string;

    @IsString()
    @ApiProperty()
    readonly password: string;

    @IsString()
    @ApiProperty()
    readonly confirmPasswod: string;

    @IsString()
    @ApiProperty()
    readonly otp: string;
}