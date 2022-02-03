import { Body, Controller, Get, Post } from '@nestjs/common';
import { ValidationPipe } from 'src/shared/pipes/validation-pipe';
import { UserDto } from './dto/userDto';
import { UserService } from './providers/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUser(): Promise<any> {
    return this.userService.getAllUser();
  }

  @Post()
  async createUser(
    @Body(new ValidationPipe()) createUserDto: UserDto,
  ): Promise<any> {
    return await this.userService.createUser(createUserDto);
  }
}
