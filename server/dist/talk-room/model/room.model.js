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
exports.RoomSchema = exports.Room = void 0;
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const options = {
    timestamps: true,
    versionKey: false,
};
let Room = class Room extends mongoose_1.Document {
};
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '620b828e1f6b15237478a8f9',
        description: '상품 고유 아이디',
    }),
    (0, mongoose_2.Prop)({ type: mongoose_1.Types.ObjectId, ref: 'users' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], Room.prototype, "toProductId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '거래 감사합니다',
        description: '채팅 마지막 내용',
        required: true,
    }),
    (0, mongoose_2.Prop)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Room.prototype, "lastContent", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'feforjgm1',
        description: '상품 판매자 아이디',
        required: true,
    }),
    (0, mongoose_2.Prop)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], Room.prototype, "sellerId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'asopdkg2',
        description: '상품 구매자 아이디',
        required: true,
    }),
    (0, mongoose_2.Prop)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], Room.prototype, "buyerId", void 0);
Room = __decorate([
    (0, mongoose_2.Schema)(options)
], Room);
exports.Room = Room;
exports.RoomSchema = mongoose_2.SchemaFactory.createForClass(Room);
exports.RoomSchema.virtual('_sellerId', {
    ref: 'users',
    localField: 'sellerId',
    foreignField: '_id',
});
exports.RoomSchema.virtual('_buyerId', {
    ref: 'users',
    localField: 'buyerId',
    foreignField: '_id',
});
exports.RoomSchema.set('toObject', { virtuals: true });
exports.RoomSchema.set('toJSON', { virtuals: true });
//# sourceMappingURL=room.model.js.map