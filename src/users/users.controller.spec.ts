import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;

  const id: number = Date.now();
  const userId = 'test@test.com';
  const password = 'test123';
  const name = 'test';
  const newPassword = 'test1234';

  const mockUsersService = {
    create: jest.fn(dto => {
      return { id, ...dto };
    }),
    checkPassword: jest.fn((userId, password) => {
      return { id, name, userId, password };
    }),
    findById: jest.fn(userId => {
      return { id, name, userId, password };
    }),
    resetPassword: jest.fn((userId, dto) => {
      return { id, name, userId, newPassword };
    }),
    delete: jest.fn((userId, password) => {
      return { id, name, userId, password };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    })
      .overrideProvider(UsersService)
      .useValue(mockUsersService)
      .compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should make the user to log in', () => {
    const loginDto: LoginDto = {
      userId,
      password,
    };

    expect(controller.login(loginDto)).toEqual({
      id: expect.any(Number),
      name: expect.any(String),
      ...loginDto,
    });
  });

  it('should create a user', () => {
    const createDto: CreateUserDto = {
      userId,
      password,
      name,
    };

    expect(controller.create(createDto)).toEqual({
      id: expect.any(Number),
      ...createDto,
    });
  });

  it('should bring in user information', () => {
    expect(controller.getUser(userId)).toEqual({
      id: expect.any(Number),
      name: expect.any(String),
      userId,
      password: expect.any(String),
    });
  });

  it('should reset the password', () => {
    const resetPasswordDto: ResetPasswordDto = {
      password,
      newPassword,
    };

    expect(controller.resetPassword(userId, resetPasswordDto)).toEqual({
      id: expect.any(Number),
      name: expect.any(String),
      userId,
      newPassword,
    });
  });

  it('should delete the user', () => {
    const loginDto: LoginDto = {
      userId,
      password,
    };

    expect(controller.delete(loginDto)).toEqual({
      id: expect.any(Number),
      name: expect.any(String),
      ...loginDto,
    });
  });
});
