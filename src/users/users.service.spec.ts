import { ConflictException, NotFoundException } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { User } from "./entity/user.entity";
import { UsersService } from "./users.service";
import * as bcrypt from "bcrypt";

describe("UsersService", () => {
  let service: UsersService;

  const testUsers = [
    {
      id: Date.now(),
      userId: "testId2",
      password: "test123#",
      name: "test",
      status: "active",
    },
  ];

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
    remove: jest.fn().mockImplementation(),
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
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should create a new user record and return that", async () => {
    expect(
      await service.create({
        userId: "testId",
        password: "test123",
        name: "test",
      })
    ).toEqual({
      id: expect.any(Number),
      name: "test",
      password: expect.any(String),
      status: "active",
      userId: "testId",
    });
  });

  it("should isIdExist True", async () => {
    expect(await service.isIdExist("testId")).toEqual(true);
  });

  it("should isIdExist returns exception", async () => {
    await expect(service.isIdExist("testId2")).rejects.toThrow(
      ConflictException
    );
  });

  it("should find user by id", async () => {
    expect(await service.findById("testId2")).toEqual(testUsers[0]);
  });

  it("should not find user by id", async () => {
    await expect(service.findById("testId")).rejects.toThrow(NotFoundException);
  });

  it("should hash password", async () => {
    const hashPassword = await service.hashPassword("test123#");

    expect(await bcrypt.compare("test123#", hashPassword)).toEqual(true);
  });

  it("should check password", async () => {
    console.log(testUsers);
    // const hashedPassword = await bcrypt.hash("test123#", 10);
    // const testUsersTemp = {
    //   name: "test",
    //   id: Date.now(),
    //   password: hashedPassword,
    //   status: "active",
    //   userId: "testId2",
    // };

    // expect(await service.checkPassword("testId2", "test123#")).toEqual(
    //   testUsersTemp
    // );
  });
});
