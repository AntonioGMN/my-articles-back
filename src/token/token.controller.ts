import {
  Body,
  Controller,
  Delete,
  HttpException,
  HttpStatus,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { refreshTokenDto } from './dto/refreshToken.dto';
import { TokenService } from './token.service';

@Controller('token')
export class TokenController {
  constructor(private tokenService: TokenService) {}

  @Put('refresh')
  async refreshToken(@Body() data: refreshTokenDto) {
    console.log('console refresh');

    const response = await this.tokenService.refreshToken(data.oldToken);
    console.log('response', response);
    if (response) return response;

    return new HttpException(
      {
        errorMessage: 'Token invalido',
      },
      HttpStatus.UNAUTHORIZED,
    );
  }
}
