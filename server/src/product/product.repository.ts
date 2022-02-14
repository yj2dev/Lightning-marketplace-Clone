import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './model/product.model';
import { ProductImage } from '../product-image/model/product-image.model';

@Injectable()
export class ProductRepository {
  constructor(
    @InjectModel(Product.name) private readonly product: Model<Product>,
    @InjectModel(ProductImage.name)
    private readonly productImage: Model<ProductImage>,
  ) {}

  // 상품 정보 저장
  async uploadProduct(currentUser, productInfo) {}

  // 상품 이미지 경로 저장
  async uploadProductImage(productId, files) {
    const result = [];

    for (const file of files) {
      const productImgURL = `https://localhost:8000/static/product_image/${file.filename}`;
      result.push(
        await this.productImage.create({
          productId,
          productImgURL,
        }),
      );
    }

    return result;
  }
}
