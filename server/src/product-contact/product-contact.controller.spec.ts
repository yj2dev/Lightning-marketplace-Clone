import { Test, TestingModule } from '@nestjs/testing';
import { ProductContactController } from './product-contact.controller';

describe('ProductContactController', () => {
  let controller: ProductContactController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductContactController],
    }).compile();

    controller = module.get<ProductContactController>(ProductContactController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
