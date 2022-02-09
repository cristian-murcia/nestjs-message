import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsNumber, IsString } from "class-validator";

export class TokenDto {

    readonly id: number;

    @IsNumber()
    @ApiProperty()
    readonly idUser: number;

    @IsString()
    @ApiProperty()
    readonly token: string;

    @IsDate()
    @ApiProperty()
    readonly deletedAt: Date;

    @IsString()
    @ApiProperty()
    readonly ipAddress: string;

}