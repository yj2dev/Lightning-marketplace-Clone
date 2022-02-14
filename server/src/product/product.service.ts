import { Injectable } from '@nestjs/common';
import { ProductRepository } from './product.repository';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  async uploadProduct(currentUser, files, productInfo) {
    const;

    const imageResult = await this.productRepository.uploadProductImage(
      currentUser,
      files,
    );
    console.log('imageResult >> ', imageResult);
  }
}
