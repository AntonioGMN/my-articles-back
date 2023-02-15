import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Put,
} from '@nestjs/common';

import { refreshTokenDto } from './dto/refreshToken.dto';
import { TokenService } from './token.service';

@Controller('token')
export class TokenController {
  constructor(private tokenService: TokenService) {}

  @Put('refresh')
  async refreshToken(@Body() data: refreshTokenDto) {
    const response = await this.tokenService.refreshToken(data.oldToken);
    if (response) return response;

    return new HttpException(
      {
        errorMessage: 'Token invalido',
      },
      HttpStatus.UNAUTHORIZED,
    );
  }
}
