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
exports.ProductContactSchema = exports.ProductContact = void 0;
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const options = {
    timestamps: true,
    versionKey: false,
};
let ProductContact = class ProductContact extends mongoose_1.Document {
};
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '620b828e1f6b15237478a8f9',
        description: '상품문의 게시글이 작성되는 상점 아이디',
        required: true,
    }),
    (0, mongoose_2.Prop)({ type: mongoose_1.Types.ObjectId, ref: 'users' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], ProductContact.prototype, "toStoreId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '620afacc4b13710ca520168e',
        description: '상품문의 게시글 작성자',
        required: true,
    }),
    (0, mongoose_2.Prop)({ type: mongoose_1.Types.ObjectId, ref: 'users' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], ProductContact.prototype, "fromWriterId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '두번째 사진 잘 안보여요',
        description: '상점문의 게시글 내용',
        required: true,
    }),
    (0, mongoose_2.Prop)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ProductContact.prototype, "content", void 0);
ProductContact = __decorate([
    (0, mongoose_2.Schema)(options)
], ProductContact);
exports.ProductContact = ProductContact;
exports.ProductContactSchema = mongoose_2.SchemaFactory.createForClass(ProductContact);
exports.ProductContactSchema.virtual('_fromWriterId', {
    ref: 'users',
    localField: 'fromWriterId',
    foreignField: '_id',
});
exports.ProductContactSchema.set('toObject', { virtuals: true });
exports.ProductContactSchema.set('toJSON', { virtuals: true });
//# sourceMappingURL=product-contact.model.js.map