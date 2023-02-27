import { Test, TestingModule } from '@nestjs/testing';
import { CurationsController } from './curations.controller';

describe('CurationsController', () => {
  let controller: CurationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CurationsController],
    }).compile();

    controller = module.get<CurationsController>(CurationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
