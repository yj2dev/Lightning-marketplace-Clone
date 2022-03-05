import { Test, TestingModule } from '@nestjs/testing';
import { ProductContactService } from './product-contact.service';

describe('ProductContactService', () => {
  let service: ProductContactService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductContactService],
    }).compile();

    service = module.get<ProductContactService>(ProductContactService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
