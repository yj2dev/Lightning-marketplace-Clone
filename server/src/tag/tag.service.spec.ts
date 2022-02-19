import { Test, TestingModule } from '@nestjs/testing';
import { TagReposigory } from './tag.reposigory';

describe('TagService', () => {
  let service: TagReposigory;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TagReposigory],
    }).compile();

    service = module.get<TagReposigory>(TagReposigory);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
