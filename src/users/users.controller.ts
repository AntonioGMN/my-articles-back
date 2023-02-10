import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  HttpStatus,
  Res,
  Delete,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../auth/auth.service';
import { JwtAuthGuard } from '../auth/jwt.auth.guard';
import { ResponseDto } from '../dto/response.dto';
import { CreateUserDto } from './dto/users.create.dto';
import { UsersService } from './users.service';
import { LoginDto } from 'src/auth/dto/login.dto';

@Controller('users')
export class UsersController {
  constructor(
    private readonly userService: UsersService,
    private authService: AuthService,
  ) {}

  @Get()
  async getAll() {
    return this.userService.findAll();
  }

  @Post('sign-up')
  async create(@Body() data: CreateUserDto): Promise<ResponseDto> {
    return this.userService.create(data);
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req, @Res() res) {
    const token = await this.authService.login(req.user);
    return res.status(HttpStatus.OK).send(token);
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  async delete(@Request() req) {
    const { userId } = req.user;
    return await this.userService.delete(userId);
  }
}
