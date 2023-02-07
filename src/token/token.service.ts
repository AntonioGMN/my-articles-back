import {
  Injectable,
  Inject,
  HttpException,
  HttpStatus,
  forwardRef,
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { Token } from './token.entity';

@Injectable()
export class TokenService {
  constructor(
    @Inject('Token_REPOSITORY')
    private tokenRepository: Repository<Token>,
    private userService: UsersService,
    @Inject(forwardRef(() => AuthService))
    private authService: AuthService,
  ) {}

  async save(hash: string, username: string) {
    const objToken = await this.tokenRepository.findOne({
      where: { username: username },
    });

    if (objToken) {
      this.tokenRepository.update(objToken.id, { hash: hash });
    } else {
      this.tokenRepository.insert({ hash: hash, username: username });
    }
  }

  async refreshToken(oldToken: string) {
    const objToken = await this.tokenRepository.findOne({
      where: { hash: oldToken },
    });

    if (objToken) {
      const user = await this.userService.findOne(objToken.username);
      return this.authService.login(user);
    }

    return new HttpException(
      {
        errorMessage: 'Token invalido',
      },
      HttpStatus.UNAUTHORIZED,
    );
  }
}
