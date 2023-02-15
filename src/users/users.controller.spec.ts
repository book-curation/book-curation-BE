import { Test, TestingModule } from "@nestjs/testing";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";

describe("UsersController", () => {
  let controller: UsersController;

  const mockUsersService = {
    create: jest.fn((dto) => {
      return { id: Date.now(), ...dto };
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

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  const dto = {
    userId: "test@test.com",
    password: "test123",
    name: "test",
  };
  it("should create a user", async () => {
    expect(controller.create(dto)).toEqual({ id: expect.any(Number), ...dto });
  });
});
