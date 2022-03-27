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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const common_1 = require("@nestjs/common");
const jwt_guard_1 = require("../../auth/guard/jwt.guard");
const user_decorator_1 = require("../../common/decorators/user.decorator");
const platform_express_1 = require("@nestjs/platform-express");
const multer_options_1 = require("../../common/utils/multer.options");
const product_service_1 = require("../service/product.service");
const user_model_1 = require("../../user/model/user.model");
let ProductController = class ProductController {
    constructor(productService) {
        this.productService = productService;
    }
    async searchTitleByKeyword(keyword) {
        return await this.productService.searchTitleByKeyword(keyword);
    }
    async getProductFavorite(currentUser) {
        return await this.productService.getProductFavorite(currentUser._id);
    }
    async getProductContact(productId) {
        return await this.productService.getProductContact(productId);
    }
    async createProductContact(productId, content, currentUser) {
        return await this.productService.createProductContact(currentUser._id, productId, content);
    }
    async deleteProductContact(askId, currentUser) {
        return await this.productService.deleteProductContact(askId);
    }
    async addFavoriteProduct(currentUser, productId) {
        console.log('currentUser >> ', currentUser);
        console.log('productId >> ', productId);
        return this.productService.addProductFavorite(currentUser._id, productId);
    }
    async deleteProduct(productId, state) {
        return await this.productService.deleteHardProduct(productId);
    }
    async updateProductState(productId, state) {
        console.log(productId, state);
        return await this.productService.updateProductState(productId, state);
    }
    async getAllProduct() {
        return this.productService.getAllProduct();
    }
    async getOneProduct(productId) {
        console.log('productId >> ', productId);
        return await this.productService.getOneProduct(productId);
    }
    async uploadProduct(currentUser, files, productInfo) {
        return await this.productService.uploadProduct(currentUser, files, JSON.parse(productInfo.data));
    }
};
__decorate([
    (0, common_1.Get)('/:keyword/search'),
    __param(0, (0, common_1.Param)('keyword')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "searchTitleByKeyword", null);
__decorate([
    (0, common_1.Get)('/favorite'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    __param(0, (0, user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_model_1.User]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getProductFavorite", null);
__decorate([
    (0, common_1.Get)('/:productId/contact'),
    __param(0, (0, common_1.Param)('productId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getProductContact", null);
__decorate([
    (0, common_1.Post)('/:productId/contact'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('productId')),
    __param(1, (0, common_1.Body)('content')),
    __param(2, (0, user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, user_model_1.User]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "createProductContact", null);
__decorate([
    (0, common_1.Delete)('/:askId/contact'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('askId')),
    __param(1, (0, user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_model_1.User]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "deleteProductContact", null);
__decorate([
    (0, common_1.Get)('/:productId/favorite'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    __param(0, (0, user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('productId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_model_1.User, String]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "addFavoriteProduct", null);
__decorate([
    (0, common_1.Delete)(''),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Query)('productId')),
    __param(1, (0, common_1.Query)('state')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "deleteProduct", null);
__decorate([
    (0, common_1.Patch)('state'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)('productId')),
    __param(1, (0, common_1.Body)('state')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "updateProductState", null);
__decorate([
    (0, common_1.Get)('all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getAllProduct", null);
__decorate([
    (0, common_1.Get)('detail/:productId'),
    __param(0, (0, common_1.Param)('productId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getOneProduct", null);
__decorate([
    (0, common_1.Post)('upload'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('image', 12, (0, multer_options_1.multerOptions)('product_image'))),
    __param(0, (0, user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.UploadedFiles)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_model_1.User,
        Array, Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "uploadProduct", null);
ProductController = __decorate([
    (0, common_1.Controller)('product'),
    __metadata("design:paramtypes", [product_service_1.ProductService])
], ProductController);
exports.ProductController = ProductController;
//# sourceMappingURL=product.controller.js.map