import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/auth/auth.service';
import { ResponseDto } from 'src/dto/response.dto';
import { CreateUserDto } from './dto/users.create.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly userService: UsersService,
    private authService: AuthService,
  ) {}

  @Get()
  async getAll() {
    console.log(process.env.JWT_SECRETE);
    return this.userService.findAll();
  }

  @Post()
  async create(@Body() data: CreateUserDto): Promise<ResponseDto> {
    return this.userService.create(data);
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
