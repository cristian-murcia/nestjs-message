import {
  Body, Controller, Delete, Get,
  UseInterceptors,
  Param, Post, Put, Res, UseGuards
} from '@nestjs/common';
import {
  ApiBadRequestResponse, ApiBearerAuth, ApiOkResponse,
  ApiOperation, ApiParam, ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Response } from 'express';

import { ValidationPipe } from 'src/shared/pipes/validation-pipe';
import { UserDto } from './dto/userDto';
import { User } from '../../entities/user.entity';
import { UserService } from './providers/user.service';
import { JwtAuthGuard } from '../token/providers/jwt-auth-guard';
import { JwtStrategy } from '../token/providers/jwt-strategy';
import { ResponseInterceptor } from 'src/shared/interceptor/response.interceptor';
import { IResponse } from 'src/shared/interfaces/response';

@ApiTags('Usuario')
@ApiBearerAuth()
@UseInterceptors(ResponseInterceptor)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @ApiOkResponse({ description: "Success", type: UserDto })
  @ApiBadRequestResponse({ description: "Bad request", type: UserDto })
  @ApiUnauthorizedResponse({ description: "Unauthorized", type: UserDto })
  @ApiOperation({ summary: "Traer todos los usuarios" })
  @UseGuards(JwtStrategy)

  @Get()
  async getAllUser(
    @Res() res: Response
  ): Promise<void> {
    try {
      let result = await this.userService.getAllUser();
      res.status(result.status).send(result);

    } catch (error) {
      throw error;
    }
  }

  @ApiOkResponse({ description: "Success", type: UserDto })
  @ApiBadRequestResponse({ description: "Bad request", type: UserDto })
  @ApiUnauthorizedResponse({ description: "Unauthorized", type: UserDto })
  @ApiParam({ name: "id", description: "Id de usuario", example: "1" })
  @ApiOperation({ summary: "Traer un usuario por Id" })
  @Get(':id')
  async getUserForId(
    @Param('id') id: string,
    @Res() res: Response
  ): Promise<void> {

    try {
      let result = await this.userService.getUserForId(Number(id));
      res.status(result.status).send(result);

    } catch (error) {
      throw error;
    }
  }

  @ApiOkResponse({ description: "Success", type: UserDto })
  @ApiBadRequestResponse({ description: "Bad request", type: UserDto })
  @ApiUnauthorizedResponse({ description: "Unauthorized", type: UserDto })
  @ApiOperation({ summary: "Crear un nuevo usuario" })
  @UseInterceptors(ResponseInterceptor)
  @Post()
  async createUser(
    @Body(new ValidationPipe()) createUserDto: UserDto,
  ): Promise<IResponse> {
    try {
      return await this.userService.createUser(createUserDto);

    } catch (error) {
      throw error;
    }
  }

  @ApiOkResponse({ description: "Success", type: UserDto })
  @ApiBadRequestResponse({ description: "Bad request", type: UserDto })
  @ApiUnauthorizedResponse({ description: "Unauthorized", type: UserDto })
  @ApiOperation({ summary: "Actualizar un usuario existente" })
  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body(new ValidationPipe()) createUserDto: UserDto,
    @Res() res: Response
  ): Promise<void> {

    try {
      let result = await this.userService.updateUser(Number(id), createUserDto);
      res.status(result.status).send(result);

    } catch (error) {
      throw error;
    }

  }

  @ApiOkResponse({ description: "Success", type: UserDto })
  @ApiBadRequestResponse({ description: "Bad request", type: UserDto })
  @ApiUnauthorizedResponse({ description: "Unauthorized", type: UserDto })
  @ApiParam({ name: "id", description: "Id de usuario a eliminar", example: "1" })
  @ApiOperation({ summary: "Eliminar un usuario existente" })
  @Delete(':id')
  async deleteUserForId(
    @Param('id') userId: string,
    @Res() res: Response
  ): Promise<void> {

    try {
      let result = await this.userService.deleteUserForId(Number(userId));
      res.status(result.status).send(result);

    } catch (error) {
      throw error;
    }
  }
}
