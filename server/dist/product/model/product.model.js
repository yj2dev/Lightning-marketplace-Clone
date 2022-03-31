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
exports.ProductSchema = exports.Product = void 0;
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const options = {
    timestamps: true,
    versionKey: false,
};
let Product = class Product extends mongoose_1.Document {
};
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'selling',
        description: '판매상태: selling(판매중), reserving(예약중), soldout(판매완료) 3가지 타입의 문자열만 입력가능 ',
        required: true,
    }),
    (0, mongoose_2.Prop)({
        required: true,
        enum: ['selling', 'reserving', 'soldout', 'delete'],
        default: 'selling',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], Product.prototype, "state", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'new ObjectId("62081b8ef29f8da07a084ad1")',
        description: '상품을 등록한 유저 아이디(상점 아이디)',
        required: true,
    }),
    (0, mongoose_2.Prop)({ type: mongoose_1.Types.ObjectId, required: true, ref: 'users' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], Product.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'https://localhost:8000/static/product_image/product4431232.png',
        description: '상품 썸네일(대표) 이미지 경로',
        required: true,
    }),
    (0, mongoose_2.Prop)({}),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], Product.prototype, "thumbnailImgURL", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'https://localhost:8000/static/product_image/product2319408132.png',
        description: '상품 이미지 경로',
        required: true,
    }),
    (0, mongoose_2.Prop)({ type: mongoose_1.Types.ObjectId, ref: 'productimages' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], Product.prototype, "productImgURL", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'false',
        description: '상품명 / 길이제한(2~40)',
        required: true,
    }),
    (0, mongoose_2.Prop)({ required: true, minlength: 2, maxlength: 40 }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], Product.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'false',
        description: 'false(기본값): 중고상품 / true: 신상품',
        required: true,
    }),
    (0, mongoose_2.Prop)({ required: true, default: false }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Boolean)
], Product.prototype, "newProduct", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'false',
        description: 'false(기본값): 교환불가 / true: 교환가능',
        required: true,
    }),
    (0, mongoose_2.Prop)({ required: true, default: false }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Boolean)
], Product.prototype, "enableExchange", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '50000',
        description: '상품가격',
        required: true,
    }),
    (0, mongoose_2.Prop)({ required: true }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], Product.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'false',
        description: 'false(기본값): 배송비 미포함 / true: 배송비 포함',
        required: true,
    }),
    (0, mongoose_2.Prop)({ required: true, default: false }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Boolean)
], Product.prototype, "containDeliveryCharge", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '상품설명',
        description: '상품설명 / 길이제한(10~2000)',
        required: true,
    }),
    (0, mongoose_2.Prop)({ required: true, minlength: 10, maxlength: 2000 }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], Product.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '상품',
        description: '상품설명 / 길이제한(10~2000)',
        required: true,
    }),
    (0, mongoose_2.Prop)({ required: true }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], Product.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '[#벼락1, #벼락2, #벼락3, #벼락4, #벼락5]',
        description: '상품태그 / 개수제한(0~5)',
        required: false,
    }),
    (0, mongoose_2.Prop)({ type: mongoose_1.Types.ObjectId, ref: 'hashtags' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], Product.prototype, "tag", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '1',
        description: '상품설명 / 1(기본값)',
        required: true,
    }),
    (0, mongoose_2.Prop)({ required: true, default: 1 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], Product.prototype, "quantity", void 0);
__decorate([
    (0, mongoose_2.Prop)({}),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], Product.prototype, "largeCateogry", void 0);
__decorate([
    (0, mongoose_2.Prop)({}),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Product.prototype, "mediumCategory", void 0);
__decorate([
    (0, mongoose_2.Prop)({}),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Product.prototype, "smallCategory", void 0);
Product = __decorate([
    (0, mongoose_2.Schema)(options)
], Product);
exports.Product = Product;
exports.ProductSchema = mongoose_2.SchemaFactory.createForClass(Product);
exports.ProductSchema.virtual('userInfo', {
    ref: 'users',
    localField: 'userId',
    foreignField: '_id',
});
exports.ProductSchema.virtual('productImgURLs', {
    ref: 'productimages',
    localField: '_id',
    foreignField: 'productId',
});
exports.ProductSchema.virtual('productFavoriteCount', {
    ref: 'productfavorites',
    localField: '_id',
    foreignField: 'fromProductId',
});
exports.ProductSchema.virtual('productContacts', {
    ref: 'productcontacts',
    localField: '_id',
    foreignField: 'toStoreId',
});
exports.ProductSchema.set('toObject', { virtuals: true });
exports.ProductSchema.set('toJSON', { virtuals: true });
//# sourceMappingURL=product.model.js.map