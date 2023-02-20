import {
  BadRequestException,
  ConflictException,
  NotFoundException,
} from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { User } from "./entity/user.entity";
import { UsersService } from "./users.service";
import * as bcrypt from "bcrypt";
import { ResetPasswordDto } from "./dto/reset-password.dto";

describe("UsersService", () => {
  let service: UsersService;
  let testUsers = [];

  const mockUsersRepository = {
    findBy: jest
      .fn()
      .mockImplementation((user) =>
        Promise.resolve(
          testUsers.filter((testUser) => testUser.userId === user.userId)
        )
      ),
    findOneBy: jest
      .fn()
      .mockImplementation((user) =>
        Promise.resolve(
          testUsers.filter((testUser) => testUser.userId === user.userId)[0]
        )
      ),
    save: jest.fn().mockImplementation((user) =>
      Promise.resolve({
        id: Date.now(),
        ...user,
        status: "active",
      })
    ),
    delete: jest.fn().mockImplementation((user) =>
      Promise.resolve({
        raw: [],
        affected: 1,
      })
    ),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUsersRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);

    testUsers = [
      await service.create({
        userId: "user@gmail.com",
        password: "user123#",
        name: "user",
      }),
    ];
  });

  afterEach(() => {
    testUsers = [];
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should create a new user record and return that", async () => {
    expect(
      await service.create({
        userId: "test@gmail.com",
        password: "test123#",
        name: "test",
      })
    ).toEqual({
      id: expect.any(Number),
      name: "test",
      password: expect.any(String),
      status: "active",
      userId: "test@gmail.com",
    });
  });

  it("should isIdExist True", async () => {
    expect(await service.isIdExist("test@gmail.com")).toEqual(true);
  });

  it("should isIdExist returns exception", async () => {
    await expect(service.isIdExist("user@gmail.com")).rejects.toThrow(
      ConflictException
    );
  });

  it("should find user by id", async () => {
    expect(await service.findById("user@gmail.com")).toEqual(testUsers[0]);
  });

  it("should not find user by id", async () => {
    await expect(service.findById("test@gmail.com")).rejects.toThrow(
      NotFoundException
    );
  });

  it("should hash password", async () => {
    const hashPassword = await service.hashPassword("user123#");

    expect(await bcrypt.compare("user123#", hashPassword)).toEqual(true);
  });

  it("should check password", async () => {
    expect(await service.checkPassword("user@gmail.com", "user123#")).toEqual(
      testUsers[0]
    );
  });

  it("should check wrong password", async () => {
    await expect(
      service.checkPassword("user@gmail.com", "user123!")
    ).rejects.toThrow(BadRequestException);
  });

  it("should reset password", async () => {
    const resetPasswordDto: ResetPasswordDto = {
      password: "user123#",
      newPassword: "user123!",
    };

    const newPassword = (
      await service.resetPassword("user@gmail.com", resetPasswordDto)
    ).password;

    expect(
      await bcrypt.compare(resetPasswordDto.newPassword, newPassword)
    ).toEqual(true);
  });

  it("should delete user information", async () => {
    const deleteResult = await service.delete("user@gmail.com", "user123#");
    expect(deleteResult.affected).toEqual(1);
  });
});
