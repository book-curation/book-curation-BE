import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../users/entity/user.entity';
import { BooksService } from '../books/books.service';
import { UsersService } from '../users/users.service';
import { CreatePhraseDto } from './dto/create-phrase.dto';
import { Phrase } from './entity/phrase.entity';
import { PhraseService } from './phrase.service';
import { UpdatePhraseDto } from './dto/update-phrase.dto';

describe('PhraseService', () => {
  let service: PhraseService;
  let testPhraseList = [];

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

  for (let i = 1; i < 10; i++) {
    testPhraseList.push({
      id: i,
      content: `testPhrase ${i}`,
      createAt: 1677407212793,
      book: testBook(i),
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

  const mockPhraseRepository = {
    save: jest
      .fn()
      .mockImplementation(phrase => Promise.resolve({ id: Date.now(), ...phrase, createAt: 1677407212793 })),
    findBy: jest
      .fn()
      .mockImplementation(book =>
        Promise.resolve(
          testPhraseList.filter(testPhrase => JSON.stringify(testPhrase.book) === JSON.stringify(book.book)),
        ),
      ),
    findOneBy: jest
      .fn()
      .mockImplementation(phraseId =>
        Promise.resolve(testPhraseList.filter(testPhrase => testPhrase.id == phraseId.id)[0]),
      ),
    delete: jest.fn().mockImplementation(phrase =>
      Promise.resolve({
        raw: [],
        affected: 1,
      }),
    ),
    createQueryBuilder: jest.fn().mockReturnValue({
      leftJoinAndSelect: jest.fn().mockReturnThis(),
      select: jest.fn().mockReturnThis(),
      orderBy: jest.fn().mockReturnThis(),
      limit: jest.fn().mockReturnThis(),
      getMany: jest.fn().mockReturnThis(),
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PhraseService,
        { provide: BooksService, useValue: mockBooksService },
        { provide: UsersService, useValue: mockUsersService },
        { provide: getRepositoryToken(Phrase), useValue: mockPhraseRepository },
      ],
    }).compile();

    service = module.get<PhraseService>(PhraseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new phrase', async () => {
    const createPhraseDto: CreatePhraseDto = {
      bookId: 1,
      userId: 'user@gmail.com',
      content: 'testPhrase',
    };
    expect(await service.create(createPhraseDto)).toEqual({
      id: expect.any(Number),
      content: createPhraseDto.content,
      createAt: expect.any(Number),
      book: testBook(createPhraseDto.bookId),
      user: testUser(createPhraseDto.userId),
    });
  });

  it('should get a phrase list by bookId', async () => {
    const bookId = 1;
    expect(await service.getPhrase(bookId)).toEqual([testPhraseList[bookId - 1]]);
  });

  it('should find a phrase information by phraseId', async () => {
    const phraseId = 1;
    expect(await service.findById(phraseId)).toEqual(testPhraseList[phraseId - 1]);
  });

  it('should not find phrase information by wrong phrase id', async () => {
    await expect(service.findById(11)).rejects.toThrow(NotFoundException);
  });

  it('should update phrase', async () => {
    const phraseId = 1;
    const updatePhraseDto: UpdatePhraseDto = {
      userId: 'user1@gmail.com',
      content: 'updatePhrase',
    };
    expect(await service.update(phraseId, updatePhraseDto)).toEqual(testPhraseList[phraseId - 1]);
  });

  it('should not update if user id does not match', async () => {
    const phraseId = 1;
    const updatePhraseDto: UpdatePhraseDto = {
      userId: 'user2@gmail.com',
      content: 'updatePhrase',
    };
    await expect(service.update(phraseId, updatePhraseDto)).rejects.toThrow(ForbiddenException);
  });

  it('should delete phrase', async () => {
    const phraseId = 1;
    const userId = 'user1@gmail.com';

    const deleteResult = await service.delete(phraseId, userId);
    expect(deleteResult.affected).toEqual(1);
  });

  it('should not delete phrase if user id does not match', async () => {
    const phraseId = 1;
    const userId = 'user2@gmail.com';

    await expect(service.delete(phraseId, userId)).rejects.toThrow(ForbiddenException);
  });

  it('should return recommend Phrase list', async () => {
    const count = 3;
    const phraseList = testPhraseList.slice(0, count);

    jest.spyOn(mockPhraseRepository.createQueryBuilder(), 'getMany').mockResolvedValue(phraseList);

    const result = await service.recommendPhrase();

    expect(mockPhraseRepository.createQueryBuilder().getMany).toHaveBeenCalled();

    expect(result.length).toEqual(count);
  });
});
