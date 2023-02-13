import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { TokenService } from '../token/token.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private tokenService: TokenService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    if (user && bcrypt.compareSync(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const userData = { username: user.email, sub: user.id };
    const token = this.jwtService.sign(userData);
    this.tokenService.save(token, user.email);
    return token;
  }

  async logout(userId: number) {
    const token = await this.usersService.findTokenByUserId(userId);
    return this.tokenService.delete(token.id);
  }
}
