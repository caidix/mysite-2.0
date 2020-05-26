import { Test, TestingModule } from '@nestjs/testing';
import { GatherController } from './gather.controller';

describe('Gather Controller', () => {
  let controller: GatherController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GatherController],
    }).compile();

    controller = module.get<GatherController>(GatherController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
