import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth/auth.service';
import { CreateUserDto } from './dto/users.create.dto';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let userController: UsersController;
  let usersService: UsersService;
  let authService: AuthService;

  const user: CreateUserDto = {
    name: 'neto',
    email: 'neto@gmail.com',
    password: '123',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            create: jest
              .fn()
              .mockResolvedValue({ ...user, id: 1, password: 'hashpassword' }),
            login: jest.fn(),
          },
        },
        {
          provide: AuthService,
          useValue: {
            validateUser: jest.fn(),
            login: jest.fn(),
          },
        },
      ],
    }).compile();

    userController = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
    expect(usersService).toBeDefined();
    expect(authService).toBeDefined();
  });

  it('sign-up a user', async () => {
    usersService.create.mockResolvedValue({
      ...user,
      id: 1,
      password: 'hashpassword',
    });
    const resulte = await userController.create(user);
    expect(resulte).toEqual({ ...user, id: 1, password: 'hashpassword' });
  });

  // it('login', async () => {
  //   const resulte = await userController.login(user);
  //   expect(resulte).toEqual({ ...user, id: 1, password: 'hashpassword' });
  // });
});
