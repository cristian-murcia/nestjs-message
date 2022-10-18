import {
  Body, Controller, Delete, Get,
  Param, Post, Put
} from '@nestjs/common';
import {
  ApiBadRequestResponse, ApiBearerAuth, ApiOkResponse,
  ApiOperation, ApiParam, ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { ValidationPipe } from 'src/shared/pipes/validation-pipe';
import { UserDto } from './dto/userDto';
import { User } from '../../entities/user.entity';
import { UserService } from './providers/user.service';
import { JwtAuthGuard } from '../token/providers/jwt-auth-guard';
import { JwtStrategy } from '../token/providers/jwt-strategy';
import { ResponseInterceptor } from 'src/shared/interceptor/response.interceptor';
import { IResponse } from 'src/shared/interfaces/response';
import { ParseIntPipe } from '@nestjs/common';
import { ParseIntPipeOptions } from '@nestjs/common';

@ApiTags('Usuario')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @ApiOkResponse({ description: "Success", type: UserDto })
  @ApiBadRequestResponse({ description: "Bad request", type: UserDto })
  @ApiUnauthorizedResponse({ description: "Unauthorized", type: UserDto })
  @ApiOperation({ summary: "Traer todos los usuarios" })
  @ApiBearerAuth("JWT-auth")
  @Get()
  async getAllUser(): Promise<IResponse> {
    try {
      return await this.userService.getAllUser();

    } catch (error) {
      throw error;
    }
  }

  @ApiOkResponse({ description: "Success", type: UserDto })
  @ApiBadRequestResponse({ description: "Bad request", type: UserDto })
  @ApiUnauthorizedResponse({ description: "Unauthorized", type: UserDto })
  @ApiOperation({ summary: "Traer un usuario por Id" })
  @ApiParam({ name: "id", description: "Id de usuario", example: 1 })
  @ApiBearerAuth("JWT-auth")
  @Get(':id')
  async getUserForId(
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<IResponse> {
    try {
      return await this.userService.getUserForId(id);

    } catch (error) {
      throw error;
    }
  }

  @ApiOkResponse({ description: "Success", type: UserDto })
  @ApiBadRequestResponse({ description: "Bad request", type: UserDto })
  @ApiUnauthorizedResponse({ description: "Unauthorized", type: UserDto })
  @ApiOperation({ summary: "Crear un nuevo usuario" })
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
  @ApiBearerAuth("JWT-auth")
  @Put(':id')
  async updateUser(
    @Param('id', new ParseIntPipe()) id: number,
    @Body(new ValidationPipe()) createUserDto: UserDto,
  ): Promise<IResponse> {
    try {
      return await this.userService.updateUser(id, createUserDto);

    } catch (error) {
      throw error;
    }
  }

  @ApiOkResponse({ description: "Success", type: UserDto })
  @ApiBadRequestResponse({ description: "Bad request", type: UserDto })
  @ApiUnauthorizedResponse({ description: "Unauthorized", type: UserDto })
  @ApiParam({ name: "id", description: "Id de usuario a eliminar", example: 1 })
  @ApiOperation({ summary: "Eliminar un usuario existente" })
  @ApiBearerAuth("JWT-auth")
  @Delete(':id')
  async deleteUserForId(
    @Param('id', new ParseIntPipe()) userId: number,
  ): Promise<IResponse> {

    try {
      return await this.userService.deleteUserForId(Number(userId));

    } catch (error) {
      throw error;
    }
  }
}
