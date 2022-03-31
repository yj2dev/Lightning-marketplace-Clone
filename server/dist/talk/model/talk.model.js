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
exports.TalkSchema = exports.Talk = void 0;
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const options = {
    timestamps: true,
    versionKey: false,
    id: false,
};
let Talk = class Talk extends mongoose_1.Document {
};
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '6236f8ae9f21683878768c72',
        description: '포함되어 있는 방 아이디',
        required: true,
    }),
    (0, mongoose_2.Prop)({ type: mongoose_1.Types.ObjectId, ref: 'rooms' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], Talk.prototype, "roomId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '620b828e1f6b15237478a8f9',
        description: '채팅 작성자(본인)',
        required: true,
    }),
    (0, mongoose_2.Prop)({ type: mongoose_1.Types.ObjectId, ref: 'users' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], Talk.prototype, "toUserId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '620afacc4b13710ca520168e',
        description: '채팅 대상(받는 사람)',
        required: true,
    }),
    (0, mongoose_2.Prop)({ type: mongoose_1.Types.ObjectId, ref: 'users' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], Talk.prototype, "fromUserId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '안녕하세요. 상품에 관심 있어서 연락드립니다.',
        description: '채팅 내용',
        required: true,
    }),
    (0, mongoose_2.Prop)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Talk.prototype, "content", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'true',
        description: '메시지 읽은 여부',
    }),
    (0, mongoose_2.Prop)({ default: true }),
    __metadata("design:type", Boolean)
], Talk.prototype, "notRead", void 0);
Talk = __decorate([
    (0, mongoose_2.Schema)(options)
], Talk);
exports.Talk = Talk;
exports.TalkSchema = mongoose_2.SchemaFactory.createForClass(Talk);
exports.TalkSchema.virtual('_toUserId', {
    ref: 'users',
    localField: 'toUserId',
    foreignField: '_id',
});
exports.TalkSchema.virtual('_fromUserId', {
    ref: 'users',
    localField: 'fromUserId',
    foreignField: '_id',
});
exports.TalkSchema.set('toObject', { virtuals: true });
exports.TalkSchema.set('toJSON', { virtuals: true });
//# sourceMappingURL=talk.model.js.map