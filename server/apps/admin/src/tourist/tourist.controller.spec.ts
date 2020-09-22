import { Test, TestingModule } from '@nestjs/testing';
import { TouristController } from './tourist.controller';

describe('Tourist Controller', () => {
  let controller: TouristController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TouristController],
    }).compile();

    controller = module.get<TouristController>(TouristController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
