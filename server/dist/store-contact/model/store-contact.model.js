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
exports.StoreContactSchema = exports.StoreContact = void 0;
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const options = {
    timestamps: true,
    versionKey: false,
};
let StoreContact = class StoreContact extends mongoose_1.Document {
};
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '620b828e1f6b15237478a8f9',
        description: '상점문의 게시글이 작성되는 상점 아이디',
        required: true,
    }),
    (0, mongoose_2.Prop)({ type: mongoose_1.Types.ObjectId, ref: 'users' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], StoreContact.prototype, "toStoreId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '620afacc4b13710ca520168e',
        description: '상점문의 게시글 작성자',
        required: true,
    }),
    (0, mongoose_2.Prop)({ type: mongoose_1.Types.ObjectId, ref: 'users' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], StoreContact.prototype, "fromWriterId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '상품이 정말 다양하네요',
        description: '상점문의 게시글 내용',
        required: true,
    }),
    (0, mongoose_2.Prop)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], StoreContact.prototype, "content", void 0);
StoreContact = __decorate([
    (0, mongoose_2.Schema)(options)
], StoreContact);
exports.StoreContact = StoreContact;
exports.StoreContactSchema = mongoose_2.SchemaFactory.createForClass(StoreContact);
exports.StoreContactSchema.virtual('_fromWriterId', {
    ref: 'users',
    localField: 'fromWriterId',
    foreignField: '_id',
});
exports.StoreContactSchema.set('toObject', { virtuals: true });
exports.StoreContactSchema.set('toJSON', { virtuals: true });
//# sourceMappingURL=store-contact.model.js.map