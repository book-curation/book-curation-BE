import { Test, TestingModule } from '@nestjs/testing';
import { User } from '../users/entity/user.entity';
import { CurationsController } from './curations.controller';
import { CurationsService } from './curations.service';
import { CreateCurationDto } from './dto/create-curation.dto';
import { UpdateCurationDto } from './dto/update-curation.dto';

describe('CurationsController', () => {
  let controller: CurationsController;

  const testCuration = {
    id: 1,
    title: 'test curation',
    isPuble: true,
    createAt: Date.now(),
    user: new User(),
    books: [1, 2],
  };

  const mockCurationService = {
    create: jest.fn(dto => {
      return testCuration;
    }),
    recommendCuration: jest.fn((count = 3) => {
      let result = [];
      for (let i = 0; i < count; i++) {
        result.push(i);
      }
      return result;
    }),
    getCurationList: jest.fn(userId => {
      return [testCuration];
    }),
    findById: jest.fn(curationId => {
      return testCuration;
    }),
    update: jest.fn(dto => {
      return testCuration;
    }),
    delete: jest.fn((userId, id) => {
      return {
        raw: [],
        affected: 1,
      };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CurationsController],
      providers: [CurationsService],
    })
      .overrideProvider(CurationsService)
      .useValue(mockCurationService)
      .compile();

    controller = module.get<CurationsController>(CurationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a curation', () => {
    const createCurationDto: CreateCurationDto = {
      title: 'test curation',
      isPublic: true,
      bookIdList: [1, 2, 3],
      userId: 'test@test.com',
    };
    expect(controller.create(createCurationDto)).toEqual(testCuration);
  });

  it('should recommend curation list', async () => {
    const count = 5;
    const curationList = await controller.recommendCurations(count);

    expect(curationList.length).toEqual(count);
  });

  it('should get curation list by user id', () => {
    const userId = 'test@test.com';
    expect(controller.getCurationList(userId)).toEqual([testCuration]);
  });

  it('should get curation information', () => {
    const curationId = 1;
    expect(controller.getCuration(curationId)).toEqual(testCuration);
  });

  it('should update curation', () => {
    const updateCurationDto: UpdateCurationDto = {
      curationId: 1,
      title: 'update curation title',
    };
    expect(controller.update(updateCurationDto)).toEqual(testCuration);
  });

  it('should delete curation', async () => {
    const userId = 'test@test.com';
    const id = 1;

    const deleteResult = await controller.delete(id, userId);

    expect(deleteResult.affected).toEqual(1);
  });
});
