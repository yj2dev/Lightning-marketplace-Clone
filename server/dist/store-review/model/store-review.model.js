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
exports.StoreReviewSchema = exports.StoreReview = void 0;
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const options = {
    timestamps: true,
    versionKey: false,
};
let StoreReview = class StoreReview extends mongoose_1.Document {
};
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '620b828e1f6b15237478a8f9',
        description: '상점후기 게시글이 작성되는 상점 아이디',
        required: true,
    }),
    (0, mongoose_2.Prop)({ type: mongoose_1.Types.ObjectId, ref: 'users' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], StoreReview.prototype, "toStoreId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '620afacc4b13710ca520168e',
        description: '상점후기 게시글 작성자',
        required: true,
    }),
    (0, mongoose_2.Prop)({ type: mongoose_1.Types.ObjectId, ref: 'users' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], StoreReview.prototype, "fromWriterId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '너무 친절하셔서 화상 입을 뻔했습니다.',
        description: '상점후기 게시글 내용',
        required: true,
    }),
    (0, mongoose_2.Prop)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], StoreReview.prototype, "content", void 0);
StoreReview = __decorate([
    (0, mongoose_2.Schema)(options)
], StoreReview);
exports.StoreReview = StoreReview;
exports.StoreReviewSchema = mongoose_2.SchemaFactory.createForClass(StoreReview);
exports.StoreReviewSchema.virtual('_fromWriterId', {
    ref: 'users',
    localField: 'fromWriterId',
    foreignField: '_id',
});
exports.StoreReviewSchema.set('toObject', { virtuals: true });
exports.StoreReviewSchema.set('toJSON', { virtuals: true });
//# sourceMappingURL=store-review.model.js.map