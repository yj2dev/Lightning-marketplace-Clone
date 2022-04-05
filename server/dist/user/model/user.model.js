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
exports.UserSchema = exports.User = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const options = {
    timestamps: true,
    versionKey: false,
};
let User = class User extends mongoose_2.Document {
};
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '01012345678',
        description: '유저 인증된 전화번호',
        required: true,
    }),
    (0, mongoose_1.Prop)({ required: true }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], User.prototype, "phoneNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Encrypted password',
        description: '유저 비밀번호',
        required: true,
    }),
    (0, mongoose_1.Prop)({ required: true }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '상점1004호',
        description: '상점명',
        required: true,
    }),
    (0, mongoose_1.Prop)({ required: true, unique: true }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], User.prototype, "storeName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '정직하고 품질좋은 물품만을 판매합니다.',
        description: '상점 소개글 길이제한(0~400)자',
        required: false,
    }),
    (0, mongoose_1.Prop)({ required: false, minlength: 0, maxlength: 400, default: '' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(0),
    (0, class_validator_1.MaxLength)(400),
    __metadata("design:type", String)
], User.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '이미지 파일',
        description: '상점 프로필 이미지',
        required: true,
    }),
    (0, mongoose_1.Prop)({
        default: 'https://lightningmarket-s3.s3.us-west-1.amazonaws.com/static/user_profile/__default_store_profile__.png',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], User.prototype, "profileURL", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '상품',
        description: '유저가 등록한 상품들',
    }),
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'products' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], User.prototype, "product", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '카카오 아이디',
        description: '소셜 로그인 계정 통합',
    }),
    (0, mongoose_1.Prop)({}),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], User.prototype, "kakaoId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '페이스북 아이디',
        description: '소셜 로그인 계정 통합',
    }),
    (0, mongoose_1.Prop)({}),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], User.prototype, "facebookId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '네이버 아이디',
        description: '소셜 로그인 계정 통합',
    }),
    (0, mongoose_1.Prop)({}),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], User.prototype, "naverId", void 0);
User = __decorate([
    (0, mongoose_1.Schema)(options)
], User);
exports.User = User;
exports.UserSchema = mongoose_1.SchemaFactory.createForClass(User);
exports.UserSchema.virtual('products', {
    ref: 'products',
    localField: '_id',
    foreignField: 'userId',
});
exports.UserSchema.set('toObject', { virtuals: true });
exports.UserSchema.set('toJSON', { virtuals: true });
exports.UserSchema.virtual('readonlyData').get(function () {
    return {
        storeName: this.storeName,
        profileURL: this.profileURL,
    };
});
//# sourceMappingURL=user.model.js.map