import { Test, TestingModule } from '@nestjs/testing';
import { PollowController } from './pollow.controller';

describe('PollowController', () => {
  let controller: PollowController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PollowController],
    }).compile();

    controller = module.get<PollowController>(PollowController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
