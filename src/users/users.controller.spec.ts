import { Test, TestingModule } from "@nestjs/testing";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";

describe("UsersController", () => {
  let controller: UsersController;

  const id = Date.now()
  const userId = "test@test.com"
  const password = "test123"
  const name = "test"
  const newPassword = "test1234"

  const mockUsersService = {
    create: jest.fn((dto) => {
      return { id, ...dto };
    }),
    checkPassword: jest.fn((userId, password) => {
      return { id, name, userId, password };
    }),
    findById: jest.fn((userId) => {
      return { id, name, userId, password };
    }),
    resetPassword: jest.fn((userId, dto) => {
      return { id, name, userId, newPassword};
    }),
    delete: jest.fn((userId, password) => {
      return { id, name, userId, password };
    })
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

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("sould make the user to log in", () => {
    const loginDto = {
      userId,
      password
    }

    expect(controller.login(loginDto)).toEqual({ id: expect.any(Number), name: expect.any(String), ...loginDto });
  })

  it("should create a user", () => {
    const createDto = {
      userId,
      password,
      name
    };
    
    expect(controller.create(createDto)).toEqual({ id: expect.any(Number), ...createDto });
  });

  it('should bring in user information', () => {
    expect(controller.getUser(userId)).toEqual({ id: expect.any(Number), name: expect.any(String), userId, password: expect.any(String)})
  })

  it('should reset the password', () => {
    const resetPasswordDto = {
      password,
      newPassword
    }

    expect(controller.resetPassword(userId, resetPasswordDto)).toEqual({ id: expect.any(Number), name: expect.any(String), userId, newPassword})
  })

  it('should delete the user', () => {
    const loginDto = {
      userId,
      password
    }

    expect(controller.delete(loginDto)).toEqual({ id: expect.any(Number), name: expect.any(String), ...loginDto })
  })

});
