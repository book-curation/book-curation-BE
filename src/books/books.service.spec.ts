import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BooksService } from './books.service';
import { Book } from './entity/book.entity';

describe('BooksService', () => {
  let service: BooksService;
  let testBooks = [];

  for (let i = 1; i < 11; i++) {
    testBooks.push({
      id: i,
      isbn: Date.now(),
      title: `test book ${i}`,
      subject: `test number ${i}`,
      publisher: `test piblisher ${i}`,
      author: `test author ${i}`,
    });
  }

  const mockBookRepository = {
    findOneBy: jest
      .fn()
      .mockImplementation(book => Promise.resolve(testBooks.filter(testBook => testBook.id == book.id)[0])),
    createQueryBuilder: jest.fn().mockReturnValue({
      select: jest.fn().mockReturnThis(),
      orderBy: jest.fn().mockReturnThis(),
      limit: jest.fn().mockReturnThis(),
      getMany: jest.fn().mockReturnThis(),
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BooksService,
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
});
