import { HttpStatus, ValidationError } from "@nestjs/common";

export interface IResponse {
    status: HttpStatus,
    error?: any | null,
    message: string,
    result?: any,
}