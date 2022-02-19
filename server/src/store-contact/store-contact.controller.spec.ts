import { Test, TestingModule } from '@nestjs/testing';
import { StoreContactController } from './store-contact.controller';

describe('StoreContactController', () => {
  let controller: StoreContactController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StoreContactController],
    }).compile();

    controller = module.get<StoreContactController>(StoreContactController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
