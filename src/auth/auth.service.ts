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
    if (!user) return { type: 'error', message: 'Usuario não encontrado' };

    if (user && bcrypt.compareSync(password, user.password)) {
      delete user.password;
      return { type: 'success', data: user };
    }

    return { type: 'error', message: 'Senha Incorreta' };
  }

  async login(user: any) {
    try {
      const userData = { username: user.email, sub: user.id };
      const token = this.jwtService.sign(userData);
      await this.tokenService.save(token, user.email);
      return token;
    } catch (err) {
      return err;
    }
  }

  async logout(userId: number) {
    const token = await this.usersService.findTokenByUserId(userId);
    return this.tokenService.delete(token.id);
  }
}
