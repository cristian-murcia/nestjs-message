/* eslint-disable prettier/prettier */
import {
    Injectable,
    ArgumentMetadata,
    PipeTransform,
    BadRequestException,
    ValidationError,
    HttpStatus,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { IResponse } from '../interfaces/response';

@Injectable()
export class ValidationPipe implements PipeTransform {
    async transform(value: any, { metatype }: ArgumentMetadata) {
        if (!metatype || !this.toValidate(metatype)) {
            return value;
        }

        const object = plainToClass(metatype, value);
        const errors: ValidationError[] = await validate(object);

        if (errors.length > 0) {
            const data: any = errors.map((err) => {
                return {
                    value: err.property,
                    error: err.constraints,
                };
            });
            throw new BadRequestException({
                status: HttpStatus.BAD_REQUEST,
                message: 'Los datos son invalidos',
                error: data,
                result: null
            } as IResponse);
        }
        return value;
    }

    private toValidate(metatype: Function): boolean {
        const types: Function[] = [String, Boolean, Number, Array, Object];
        return !types.includes(metatype);
    }
}
