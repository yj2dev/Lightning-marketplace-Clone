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
exports.ProductImageSchema = exports.ProductImage = void 0;
const mongoose_1 = require("mongoose");
const swagger_1 = require("@nestjs/swagger");
const mongoose_2 = require("@nestjs/mongoose");
const class_validator_1 = require("class-validator");
const options = {
    timestamps: true,
    versionKey: false,
};
let ProductImage = class ProductImage extends mongoose_1.Document {
};
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '상품 아이디',
        description: '이미지가 등록된 상품 아이디',
        required: true,
    }),
    (0, mongoose_2.Prop)({ type: mongoose_1.Types.ObjectId, ref: 'products' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], ProductImage.prototype, "productId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '상품 이미지 경로',
        description: '상품에 등록된 이미지 경로',
        required: true,
    }),
    (0, mongoose_2.Prop)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ProductImage.prototype, "productImgURL", void 0);
ProductImage = __decorate([
    (0, mongoose_2.Schema)(options)
], ProductImage);
exports.ProductImage = ProductImage;
exports.ProductImageSchema = mongoose_2.SchemaFactory.createForClass(ProductImage);
//# sourceMappingURL=product-image.model.js.map