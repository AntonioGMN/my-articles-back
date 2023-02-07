import { Body, Controller, Put } from '@nestjs/common';
import { refreshTokenDto } from './dto/refreshToken.dto';
import { TokenService } from './token.service';

@Controller('token')
export class TokenController {
  constructor(private tokenService: TokenService) {}

  @Put('refresh')
  async refreshToken(@Body() data: refreshTokenDto) {
    return this.tokenService.refreshToken(data.oldToken);
  }
}
