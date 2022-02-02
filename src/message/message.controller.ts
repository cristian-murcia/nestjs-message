import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message-dto';

@Controller('message')
export class MessageController {
  /**
   * Get all message
   * @returns
   */
  @Get()
  findAll(): string {
    return 'This action returns all cats';
  }

  /**
   * Get message for id
   * @returns
   */
  @Get(':id')
  findById(@Param('id') params: any): string {
    return `Hola texto ${params}`;
  }

  /**
   * Create one message
   * @param createMessage
   * @returns
   */
  @Post()
  createMessage(@Body() createMessage: CreateMessageDto): any {
    return `Creado con èxito ${createMessage.nick}`;
  }

  /**
   * Update message for nick
   * @param id
   * @param message
   * @returns
   */
  @Put(':id')
  updateMessage(
    @Param('id') id: string,
    @Body() message: CreateMessageDto,
  ): any {
    return `Todo actualizado correctamente ${message.message} con id: ${id}`;
  }

  /**
   * Delete message
   * @param id
   * @returns
   */
  @Delete(':id')
  deleteMessage(@Param('id') id: string): any {
    return 'orrado con èxito' + id;
  }
}
