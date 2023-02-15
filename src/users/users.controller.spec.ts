import { Res } from "@nestjs/common";
import { HttpStatus } from "@nestjs/common/enums";
import { Test, TestingModule } from "@nestjs/testing";
import { Response } from "express";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";

describe("UsersController", () => {
  let controller: UsersController;

  let res: Response = {
    status: HttpStatus.OK,
    send:
  }

  const mockUsersService = {
    create: jest.fn((dto) => dto),
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

  it("should create a user", async () => {
    const response = await controller.create(
      {
        userId: "test@test.com",
        password: "test123",
        name: "test",
      },
      res
    );
    
  });
});
