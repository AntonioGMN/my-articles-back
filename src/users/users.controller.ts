import { Body, Controller, Get, Post } from '@nestjs/common';
import { ResponseDto } from 'src/dto/response.dto';
import { CreateUserDto } from './dto/users.create.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  async getAll() {
    return this.userService.findAll();
  }

  @Post()
  async create(@Body() data: CreateUserDto): Promise<ResponseDto> {
    return this.userService.create(data);
  }
}
