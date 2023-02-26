import { forwardRef, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { HashtagService } from '../hashtag/hashtag.service';
import { BooksService } from './books.service';
import { Book } from './entity/book.entity';

describe('BooksService', () => {
  let service: BooksService;
  let testBooks = [];

  const testHashtag = hashtagId => {
    return {
      id: hashtagId,
      content: `test hashtag ${hashtagId}`,
    };
  };

  for (let i = 1; i < 11; i++) {
    testBooks.push({
      id: i,
      isbn: Date.now(),
      title: `test book ${i}`,
      subject: `test number ${i}`,
      publisher: `test publisher ${i}`,
      author: `test author ${i}`,
      hashtag: testHashtag(i),
    });
  }

  const mockHashtagService = {
    findById: jest.fn(hashtagId => {
      return testHashtag(hashtagId);
    }),
    findBookByHashtag: jest.fn(hashtagId => {
      return [testBooks[0]];
    }),
  };
  const mockBookRepository = {
    findOne: jest
      .fn()
      .mockImplementation(book => Promise.resolve(testBooks.filter(testBook => testBook.id === book.where.id)[0])),
    createQueryBuilder: jest.fn().mockReturnValue({
      select: jest.fn().mockReturnThis(),
      orderBy: jest.fn().mockReturnThis(),
      limit: jest.fn().mockReturnThis(),
      getMany: jest.fn().mockReturnThis(),
    }),
    find: jest
      .fn()
      .mockImplementation(book => Promise.resolve(testBooks.filter(testBook => testBook.id === book.where.id))),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BooksService,
        {
          provide: HashtagService,
          useValue: mockHashtagService,
        },
        {
          provide: getRepositoryToken(Book),
          useValue: mockBookRepository,
        },
      ],
    }).compile();

    service = module.get<BooksService>(BooksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find book information by book id', async () => {
    const index = 1;
    expect(await service.findById(index)).toEqual(testBooks[index - 1]);
  });

  it('should not find book information by wrong book id', async () => {
    await expect(service.findById(11)).rejects.toThrow(NotFoundException);
  });

  it('should recommend book list of count books', async () => {
    const count = 3;
    const bookList = testBooks.slice(0, count);

    jest.spyOn(mockBookRepository.createQueryBuilder(), 'getMany').mockResolvedValue(bookList);

    const result = await service.recommendBooks();

    expect(mockBookRepository.createQueryBuilder().getMany).toHaveBeenCalled();

    expect(result.length).toEqual(count);
  });

  it('should get book list by hashtag id', async () => {
    const hashtagId = 0;

    const bookList = [
      {
        id: testBooks[0].id,
        title: testBooks[0].title,
        author: testBooks[0].author,
      },
    ];

    expect(await service.getBookByHashtagId(hashtagId)).toEqual(bookList);
  });

  it('should find hashtag by book id', async () => {
    const bookId = 1;

    expect(await service.findHashtagByBook(bookId)).toEqual(testBooks[bookId - 1].hashtag);
  });
});
