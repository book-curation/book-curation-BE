import { forwardRef, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UsersService } from '../users/users.service';
import { BooksService } from '../books/books.service';
import { Hashtag } from './entity/hashtag.entity';
import { HashtagService } from './hashtag.service';
import { CreateHashtagDto } from './dto/create-hashtag.dto';

describe('HashtagService', () => {
  let service: HashtagService;
  let testHashtags = [];

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
      registerAt: Date.now(),
    };
  };

  for (let i = 1; i < 6; i++) {
    testHashtags.push({
      id: i,
      content: `test hashtag ${i}`,
      users: testUser(`user${i}@gmail.com`),
      books: testBook(i),
    });
  }

  for (let i = 6; i < 11; i++) {
    testHashtags.push({
      id: i,
      content: `test hashtag ${i}`,
      users: [],
      books: testBook(i),
    });
  }

  const mockBooksService = {
    findById: jest.fn(bookId => {
      return testBook(bookId);
    }),
    findHashtagByBook: jest.fn(bookId => {
      return testHashtags;
    }),
  };

  const mockUsersService = {
    findById: jest.fn(userId => {
      return testUser(userId);
    }),
    deleteHashtag: jest.fn((hashtagId, userId) => {
      return testUser(userId);
    }),
  };

  const mockHashtagRepository = {
    findOne: jest
      .fn()
      .mockImplementation(hasthag =>
        Promise.resolve(testHashtags.filter(testHashtag => testHashtag.id === hasthag.where.id)[0]),
      ),
    findOneBy: jest
      .fn()
      .mockImplementation(content =>
        Promise.resolve(testHashtags.filter(testHashtag => testHashtag.content === content)[0]),
      ),
    save: jest.fn().mockImplementation(hashtag =>
      Promise.resolve({
        id: Date.now(),
        ...hashtag,
      }),
    ),
    delete: jest.fn().mockImplementation(hashtag =>
      Promise.resolve({
        raw: [],
        affected: 1,
      }),
    ),
    find: jest
      .fn()
      .mockImplementation(hashtag =>
        Promise.resolve(testHashtags.filter(testHashtag => testHashtag.id === hashtag.where.id)),
      ),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HashtagService,
        {
          provide: BooksService,
          useValue: mockBooksService,
        },
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
        {
          provide: getRepositoryToken(Hashtag),
          useValue: mockHashtagRepository,
        },
      ],
    }).compile();

    service = module.get<HashtagService>(HashtagService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create new hashtag by user', async () => {
    const createHashtagDto: CreateHashtagDto = {
      bookId: 1,
      userId: 'user@gmail.com',
      content: ['tag1', 'tag2'],
    };
    expect(await service.create(createHashtagDto)).toEqual('Hashtags successfully created');
  });

  it('should get hashtag list by book id', async () => {
    const bookId = 1;
    let hashtagList = [];
    testHashtags.map(testHashtag => hashtagList.push(testHashtag.content));

    expect(await service.getHashtagByBookId(bookId)).toEqual(hashtagList);
  });

  it('should find hashtag information by hashtag id', async () => {
    const index = 1;
    expect(await service.findById(index)).toEqual(testHashtags[index - 1]);
  });

  it('should not find hashtag information by wrong hashtag id', async () => {
    await expect(service.findById(11)).rejects.toThrow(NotFoundException);
  });

  it('should delete hashtag by user', async () => {
    const hashtagId = 1;
    const userId = 'user@gmail.com';

    expect(await service.deleteHashtagByUser(hashtagId, userId)).toEqual(testUser(userId));
    expect(mockUsersService.deleteHashtag).toHaveBeenCalledWith(hashtagId, userId);
  });

  it('should not delete hashtag if there is connection with user', async () => {
    const hashtagId = 1;

    expect(await service.delete(hashtagId)).toEqual(undefined);
  });

  it('should delete hashtag if there is no connection with user', async () => {
    const hashtagId = 6;

    const deleteResult = await service.delete(hashtagId);

    expect(deleteResult.affected).toEqual(1);
  });

  it('should find book list by hashtag id', async () => {
    const hashtagId = 1;

    expect(await service.findBookByHashtag(hashtagId)).toEqual(testHashtags[hashtagId - 1].books);
  });
});
