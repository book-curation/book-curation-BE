import { Test, TestingModule } from '@nestjs/testing';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';

describe('BooksController', () => {
  let controller: BooksController;

  const testBookInfo = {
    isbn: Date.now(),
    title: 'test book',
    subject: 'test number',
    publisher: 'test publisher',
    author: 'test author',
  };

  const mockBooksService = {
    findById: jest.fn(id => {
      return {
        id,
        ...testBookInfo,
      };
    }),
    recommendBooks: jest.fn((count = 3) => {
      let result = [];
      for (let i = 0; i < count; i++) {
        result.push(i);
      }
      return result;
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BooksController],
      providers: [BooksService],
    })
      .overrideProvider(BooksService)
      .useValue(mockBooksService)
      .compile();

    controller = module.get<BooksController>(BooksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get a list of count books', async () => {
    const count = 5;
    const bookList = await controller.recommendBooks(count);

    expect(bookList.length).toEqual(count);
  });

  it('should get book information by book id', () => {
    const id = 100;
    expect(controller.getBook(id)).toEqual({
      id,
      ...testBookInfo,
    });
  });
});
