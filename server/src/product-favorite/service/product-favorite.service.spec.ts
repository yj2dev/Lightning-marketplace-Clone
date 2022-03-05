import { Test, TestingModule } from '@nestjs/testing';
import { ProductFavoriteService } from './product-favorite.service';

describe('ProductFavoriteService', () => {
  let service: ProductFavoriteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductFavoriteService],
    }).compile();

    service = module.get<ProductFavoriteService>(ProductFavoriteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
