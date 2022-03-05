import { Test, TestingModule } from '@nestjs/testing';
import { PollowService } from './pollow.service';

describe('PollowService', () => {
  let service: PollowService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PollowService],
    }).compile();

    service = module.get<PollowService>(PollowService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
