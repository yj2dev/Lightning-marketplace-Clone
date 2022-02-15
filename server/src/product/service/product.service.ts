import { HttpException, Injectable } from '@nestjs/common';
import { ProductRepository } from '../repository/product.repository';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  async getAllProduct() {
    return await this.productRepository.getAllProduct();
  }

  async uploadProduct(currentUser, files, productInfo) {
    // 태그만 따로 추출 후 DB 저장
    const tags = productInfo.tag;

    delete productInfo['tag'];

    // 상품정보 저장 후 상품아이디를 받아온다.
    const productId = await this.productRepository.uploadProduct(
      currentUser,
      productInfo,
    );

    // 받아온 상품 아이디를 사용해 상품이미지 저장
    const imageUploadResult = await this.productRepository.uploadProductImage(
      productId,
      files,
    );

    // 상품 이미지가 업로드 성공
    if (imageUploadResult) {
    } else {
      // 상품 이미지가 업로드 실패
      throw new HttpException('상품 이미지 업로드에 실패하였습니다.', 409);
    }
  }
}
