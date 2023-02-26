import { Test, TestingModule } from '@nestjs/testing';
import { HashtagController } from './hashtag.controller';
import { HashtagService } from './hashtag.service';

describe('HashtagController', () => {
  let controller: HashtagController;

  const testHashtag = {
    bookId: 1,
    userId: 'user@gmail.com',
    content: ['hashtag1', 'hashtag2'],
  };

  const testUser = {
    id: Date.now(),
    userId: 'test@gmail.com',
    password: 'test123',
    name: 'test',
    status: 'active',
  };

  const mockHashtagService = {
    create: jest.fn(dto => {
      return 'Hashtags successfully created';
    }),
    getHashtagByBookId: jest.fn(bookId => {
      return testHashtag.content;
    }),
    deleteHashtagByUser: jest.fn((id, userId) => {
      return testUser;
    }),
    delete: jest.fn(id => {
      return testUser;
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HashtagController],
      providers: [HashtagService],
    })
      .overrideProvider(HashtagService)
      .useValue(mockHashtagService)
      .compile();

    controller = module.get<HashtagController>(HashtagController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create hashtag', () => {
    expect(controller.create(testHashtag[0])).toEqual('Hashtags successfully created');
  });

  it('should get hashtag by book id', () => {
    const bookId = 1;

    expect(controller.getHashtagByBookId(bookId)).toEqual(testHashtag.content);
  });

  it('should delete user own hashtag', async () => {
    const userId = 'user@gmail.com';

    expect(await controller.delete(1, userId)).toEqual('Hashtag successfully deleted');
  });
});
