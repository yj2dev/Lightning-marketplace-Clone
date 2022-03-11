import { HttpException, Injectable } from '@nestjs/common';
import { ProductRepository } from '../repository/product.repository';
import { Product } from '../model/product.model';
import { TagRepository } from '../../tag/tag.reposigory';
import { ProductFavorite } from '../../product-favorite/model/product-favorite.model';

@Injectable()
export class ProductService {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly tagRepository: TagRepository,
  ) {}

  async getProductFavorite(userId: string): Promise<ProductFavorite[]> {
    return await this.productRepository.getProductFavorite(userId);
  }

  // 특정 상품 문의내용 가져오기
  async getProductContact(productId: string): Promise<any> {
    return await this.productRepository.getProductContactAll(productId);
  }

  // 상품 문의 작성
  async createProductContact(
    userId: string,
    productId: string,
    content: string,
  ): Promise<any> {
    return await this.productRepository.createProductContact(
      userId,
      productId,
      content,
    );
  }

  // 상품 문의 제거
  async deleteProductContact(userId: string, productId: string): Promise<any> {
    return await this.productRepository.deleteProductContact(userId, productId);
  }

  // 상품 문의 수정
  async updateProductContact(
    userId: string,
    productId: string,
    content: string,
  ): Promise<any> {
    return await this.productRepository.updateProductContact(
      userId,
      productId,
      content,
    );
  }

  // 상품 즐겨찾기(찜) 추가 또는 제거
  // 추가 했다면 true, 제거했다면 false(기본값) 반환
  async addProductFavorite(
    userId: string,
    productId: string,
  ): Promise<boolean> {
    const isProductFavorite =
      await this.productRepository.findByIdProductFavorite(userId, productId);

    // 즐겨찾기 여부 확인
    if (isProductFavorite) {
      // 정보가 있다면 즐겨찾기 해제
      await this.productRepository.deleteProductFavorite(userId, productId);
    } else {
      // 정보가 없다면 즐겨찾기 추가
      await this.productRepository.createProductFavorite(userId, productId);
      return true;
    }

    return false;
  }

  // 상품 물리적 제거(Hard Delete), 연결된 태그도 제거
  async deleteHardProduct(productId: string): Promise<boolean> {
    const deleteProductResult = await this.productRepository.deleteHardProduct(
      productId,
    );

    // 삭제가 잘 되지 않았으면 에러 발생
    if (!deleteProductResult)
      throw new HttpException('상품 제거에 실패했습니다.', 409);

    const deleteTagsResult = await this.tagRepository.deleteTagsByProductId(
      productId,
    );

    // 태그가 제거되지 않았으면 애러 발생
    if (!deleteTagsResult)
      throw new HttpException('상품에 등록된 태그 제거에 실패했습니다.', 409);

    return true;
  }

  // 상품의 상태필드 수정하기
  async updateProductState(productId: string, state: string): Promise<Product> {
    return await this.productRepository.updateProduct(productId, { state });
  }

  // 하나의 상품만 가져오기
  async getOneProduct(productId: string): Promise<Product> {
    return await this.productRepository.findByIdAndPopulate(productId);
  }

  // 모든 상품 가져오기
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
