import { Body, Controller, Delete, Get, HttpException, HttpStatus, NotFoundException, Param, Post, Put, Query, Res } from '@nestjs/common';
import { Response } from 'express';

import { IResponse } from 'src/shared/interfaces/response';
import { ValidationPipe } from 'src/shared/pipes/validation-pipe';
import { UserDto } from './dto/userDto';
import { User } from '../../entities/user.entity';
import { UserService } from './providers/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get()
  async getAllUser(
    @Res() res: Response
  ): Promise<void> {
    let users = await this.userService.getAllUser();

    res.status(HttpStatus.OK).send({
      status: HttpStatus.OK,
      error: null,
      message: "Lista de usuarios",
      result: users
    } as IResponse);
  }

  @Get(':id')
  async getUserForId(
    @Param('id') id: string,
    @Res() res: Response
  ): Promise<any> {

    if (id) {
      let user: User = await this.userService.getUserForId(Number(id));

      if (user) {
        res.status(HttpStatus.OK).send({
          status: HttpStatus.OK,
          error: null,
          message: `Usuario con id ${id}`,
          result: user
        } as IResponse);

      } else {

        throw new HttpException({
          status: HttpStatus.NOT_FOUND,
          error: null,
          message: `No existe un usuario con el id ${id}`,
          result: null
        } as IResponse, HttpStatus.NOT_FOUND);
      }
    }
  }

  @Post()
  async createUser(
    @Body(new ValidationPipe()) createUserDto: UserDto,
    @Res() res: Response
  ): Promise<void> {

    let user: User = await this.userService.createUser(createUserDto);

    if (user) {
      res.status(HttpStatus.OK).send({
        status: HttpStatus.OK,
        error: null,
        message: "Usuario guardado con éxito",
        result: user
      } as IResponse);
    }
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body(new ValidationPipe()) createUserDto: UserDto,
    @Res() res: Response
  ): Promise<void> {

    if (Number(id)) {
      let user = await this.userService.getUserForId(Number(id));

      if (user && user.id) {
        let result = await this.userService.updateUser(user.id, createUserDto);

        if (result) {
          res.status(HttpStatus.OK).send({
            status: HttpStatus.OK,
            error: null,
            message: "Usuario actualizado con éxito",
            result: result
          } as IResponse);
        }

      } else {
        throw new NotFoundException({
          status: HttpStatus.NOT_FOUND,
          error: null,
          message: "No existe un usuario con ese id",
          result: null
        } as IResponse);
      }

    } else {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: null,
        message: `El id no es valido`
      } as IResponse, HttpStatus.BAD_REQUEST);
    }

  }

  @Delete(':id')
  async deleteUserForId(
    @Param('id') userId: string,
    @Res() res: Response
  ): Promise<void> {

    if (Number(userId)) {

      let exist = await this.userService.getUserForId(Number(userId));
      if (!exist) {
        throw new NotFoundException({
          status: HttpStatus.NOT_FOUND,
          error: null,
          message: `No existe un usuario con el id ${userId}`
        } as IResponse);
      }

      let result = await this.userService.deleteUserForId(Number(userId));

      if (result) {
        res.status(HttpStatus.OK).send({
          status: HttpStatus.OK,
          error: null,
          message: "Usuario eliminado con éxito",
          result: null
        } as IResponse);
      }

    } else {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: null,
        message: `El id no es valido`
      } as IResponse, HttpStatus.BAD_REQUEST);
    }
  }
}
