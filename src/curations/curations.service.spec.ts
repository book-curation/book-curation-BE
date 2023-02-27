import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BooksService } from '../books/books.service';
import { UsersService } from '../users/users.service';
import { CurationsService } from './curations.service';
import { CreateCurationDto } from './dto/create-curation.dto';
import { UpdateCurationDto } from './dto/update-curation.dto';
import { Curation } from './entity/curation.entity';

describe('CurationsService', () => {
  let service: CurationsService;
  let testCurationList = [];

  const testBook = (bookId: number) => {
    return {
      id: bookId,
      isbn: 'test-isbn',
      title: 'test-tile',
      subject: 'test-subject',
      publisher: 'test-publisher',
      author: 'test-author',
    };
  };

  const testUser = (userId: string) => {
    return {
      id: 1,
      userId,
      password: 'test123',
      name: 'test',
      status: 'active',
      registerAt: 1677407212793,
    };
  };

  for (let i = 1; i < 6; i++) {
    testCurationList.push({
      id: i,
      title: `testPhrase ${i}`,
      createAt: 1677407212793,
      isPublic: true,
      books: [testBook(i)],
      user: testUser(`user${i}@gmail.com`),
    });
  }

  for (let i = 6; i < 11; i++) {
    testCurationList.push({
      id: i,
      title: `testPhrase ${i}`,
      createAt: 1677407212793,
      isPublic: false,
      books: [testBook(i)],
      user: testUser(`user${i}@gmail.com`),
    });
  }

  const mockBooksService = {
    findById: jest.fn(bookId => {
      return testBook(bookId);
    }),
  };

  const mockUsersService = {
    findById: jest.fn(userId => {
      return testUser(userId);
    }),
  };

  const mockCurationRepository = {
    save: jest.fn().mockImplementation(curation => Promise.resolve({ id: 1, createAt: 1677407212793, ...curation })),
    find: jest
      .fn()
      .mockImplementation(user =>
        Promise.resolve(testCurationList.filter(testCuration => testCuration.user.userId == user.where.user.userId)[0]),
      ),
    findOne: jest
      .fn()
      .mockImplementation(curation =>
        Promise.resolve(testCurationList.filter(testCuration => testCuration.id == curation.where.id)[0]),
      ),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CurationsService,
        { provide: BooksService, useValue: mockBooksService },
        { provide: UsersService, useValue: mockUsersService },
        { provide: getRepositoryToken(Curation), useValue: mockCurationRepository },
      ],
    }).compile();

    service = module.get<CurationsService>(CurationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new curation', async () => {
    const createCurationDto: CreateCurationDto = {
      title: 'test curation',
      isPublic: true,
      bookIdList: [1, 2, 3],
      userId: 'test@test.com',
    };
    expect(await service.create(createCurationDto)).toEqual({
      id: expect.any(Number),
      createAt: expect.any(Number),
      title: createCurationDto.title,
      isPublic: createCurationDto.isPublic,
      books: expect.any(Array),
      user: expect.any(Object),
    });
  });

  it('should get curation list', async () => {
    const curationId = 1;
    const userId = `user${curationId}@gmail.com`;

    expect(await service.getCurationList(userId)).toEqual(testCurationList[curationId - 1]);
  });

  it('should find curation by curation id', async () => {
    const curationId = 1;

    expect(await service.findById(curationId)).toEqual(testCurationList[curationId - 1]);
  });

  it('should not find curation by wrong curation id', async () => {
    const curationId = 11;
    await expect(service.findById(curationId)).rejects.toThrow(NotFoundException);
  });

  it('should update curation when title is changed', async () => {
    const updateCurationDto: UpdateCurationDto = {
      curationId: 1,
      title: 'updated curation title',
    };
    expect(await service.update(updateCurationDto)).toEqual(testCurationList[updateCurationDto.curationId - 1]);
  });
});
