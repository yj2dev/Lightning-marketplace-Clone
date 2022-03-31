"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const product_repository_1 = require("../repository/product.repository");
const tag_reposigory_1 = require("../../tag/tag.reposigory");
let ProductService = class ProductService {
    constructor(productRepository, tagRepository) {
        this.productRepository = productRepository;
        this.tagRepository = tagRepository;
    }
    async searchTitleByKeyword(keyword) {
        return await this.productRepository.searchTitleByKeyword(keyword);
    }
    async getProductFavorite(userId) {
        return await this.productRepository.getProductFavorite(userId);
    }
    async getProductContact(productId) {
        return await this.productRepository.getProductContactAll(productId);
    }
    async createProductContact(userId, productId, content) {
        return await this.productRepository.createProductContact(userId, productId, content);
    }
    async deleteProductContact(askId) {
        return await this.productRepository.deleteProductContact(askId);
    }
    async addProductFavorite(userId, productId) {
        const isProductFavorite = await this.productRepository.findByIdProductFavorite(userId, productId);
        if (isProductFavorite) {
            await this.productRepository.deleteProductFavorite(userId, productId);
        }
        else {
            await this.productRepository.createProductFavorite(userId, productId);
            return true;
        }
        return false;
    }
    async deleteHardProduct(productId) {
        const deleteProductResult = await this.productRepository.deleteHardProduct(productId);
        if (!deleteProductResult)
            throw new common_1.HttpException('상품 제거에 실패했습니다.', 409);
        const deleteTagsResult = await this.tagRepository.deleteTagsByProductId(productId);
        if (!deleteTagsResult)
            throw new common_1.HttpException('상품에 등록된 태그 제거에 실패했습니다.', 409);
        return true;
    }
    async updateProductState(productId, state) {
        return await this.productRepository.updateProduct(productId, { state });
    }
    async getOneProduct(productId) {
        return await this.productRepository.findByIdAndPopulate(productId);
    }
    async getAllProduct() {
        return await this.productRepository.getAllProduct();
    }
    async uploadProduct(currentUser, files, productInfo) {
        const tags = productInfo.tag;
        delete productInfo['tag'];
        const productId = await this.productRepository.uploadProduct(currentUser, productInfo);
        const saveTagResult = await this.tagRepository.saveTags(tags, productId);
        if (!saveTagResult)
            throw new common_1.HttpException('태그 저장에 실패했습니다.', 409);
        const imageUploadResult = await this.productRepository.uploadProductImage(productId, files);
        if (!imageUploadResult)
            throw new common_1.HttpException('상품 이미지 업로드에 실패하였습니다.', 409);
        return true;
    }
};
ProductService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [product_repository_1.ProductRepository,
        tag_reposigory_1.TagRepository])
], ProductService);
exports.ProductService = ProductService;
//# sourceMappingURL=product.service.js.map