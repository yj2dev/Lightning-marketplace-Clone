import { Test, TestingModule } from '@nestjs/testing';
import { TalkGateway } from './talk.gateway';

describe('TalkGateway', () => {
  let gateway: TalkGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TalkGateway],
    }).compile();

    gateway = module.get<TalkGateway>(TalkGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
