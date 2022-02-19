import { HttpException, Injectable } from '@nestjs/common';
import { ProductRepository } from '../repository/product.repository';
import { Product } from '../model/product.model';
import { TagRepository } from '../../tag/tag.reposigory';

@Injectable()
export class ProductService {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly tagRepository: TagRepository,
  ) {}

  async getOneProduct(productId: string): Promise<Product> {
    return await this.productRepository.findByIdAndPopulate(productId);
  }

  async getAllProduct() {
    return await this.productRepository.getAllProduct();
  }

  async uploadProduct(currentUser, files, productInfo): Promise<boolean> {
    // 태그만 먼저 추출 후 객체에서 제거
    const tags = productInfo.tag;
    delete productInfo['tag'];

    // 상품정보 저장 후 상품아이디를 받아온다.
    const productId = await this.productRepository.uploadProduct(
      currentUser,
      productInfo,
    );

    // 받아온 상품아이디로 태그를 저장한다.
    const saveTagResult = await this.tagRepository.saveTags(tags, productId);

    // 태그 저장 실패
    if (!saveTagResult)
      throw new HttpException('태그 저장에 실패했습니다.', 409);

    // 받아온 상품 아이디를 사용해 상품이미지 저장
    const imageUploadResult = await this.productRepository.uploadProductImage(
      productId,
      files,
    );

    // 상품 이미지가 업로드 실패
    if (!imageUploadResult)
      throw new HttpException('상품 이미지 업로드에 실패하였습니다.', 409);

    // 유저(상점) 정보 저장 성공
    return true;
  }
}
