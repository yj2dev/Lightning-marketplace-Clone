import { Test, TestingModule } from '@nestjs/testing';
import { ProductFavoriteController } from './product-favorite.controller';

describe('ProductFavoriteController', () => {
  let controller: ProductFavoriteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductFavoriteController],
    }).compile();

    controller = module.get<ProductFavoriteController>(ProductFavoriteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
