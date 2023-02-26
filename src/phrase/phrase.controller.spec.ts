import { Test, TestingModule } from '@nestjs/testing';
import { CreatePhraseDto } from './dto/create-phrase.dto';
import { UpdatePhraseDto } from './dto/update-phrase.dto';
import { PhraseController } from './phrase.controller';
import { PhraseService } from './phrase.service';

describe('PhraseController', () => {
  let controller: PhraseController;

  const testPhrase = {
    id: 1,
    content: 'testPhrase',
    createdAt: Date.now(),
  };

  const mockPhraseService = {
    create: jest.fn(dto => {
      return testPhrase;
    }),
    recommendPhrase: jest.fn(count => {
      return [testPhrase];
    }),
    getPhrase: jest.fn(bookId => {
      return [testPhrase];
    }),
    update: jest.fn((id, updatePhraseDto) => {
      return testPhrase;
    }),
    delete: jest.fn((id, userId) => {
      return {
        raw: [],
        affected: 1,
      };
    }),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PhraseController],
      providers: [PhraseService],
    })
      .overrideProvider(PhraseService)
      .useValue(mockPhraseService)
      .compile();

    controller = module.get<PhraseController>(PhraseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a Phrase', () => {
    const createPhraseDto: CreatePhraseDto = {
      bookId: 1,
      userId: 'test@gmail.com',
      content: 'testPhrase',
    };
    expect(controller.create(createPhraseDto)).toEqual(testPhrase);
  });

  it('should recommend a Phrase list', () => {
    expect(controller.recommendPhrase(1)).toEqual([testPhrase]);
  });

  it('should get a Phrase list by bookId', () => {
    expect(controller.getPhrase(1)).toEqual([testPhrase]);
  });

  it('should update a Phrase', () => {
    const updatePhraseDto: UpdatePhraseDto = {
      userId: 'test@gmail.com',
      content: 'updatePhrase',
    };
    expect(controller.update(1, updatePhraseDto)).toEqual(testPhrase);
  });

  it('should delete a Phrase', async () => {
    const deleteResult = await controller.delete(1, 'test@gmail.com');
    expect(deleteResult.affected).toEqual(1);
  });
});
