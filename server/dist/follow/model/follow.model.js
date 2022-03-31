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
exports.FollowSchema = exports.Follow = void 0;
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const options = {
    timestamps: true,
    versionKey: false,
};
let Follow = class Follow extends mongoose_1.Document {
};
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '620afacc4b13710ca520168e',
        description: '팔로우 한 사람(팔로우 버튼을 누른사람)',
        required: true,
    }),
    (0, mongoose_2.Prop)({ type: mongoose_1.Types.ObjectId, ref: 'users' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], Follow.prototype, "fromUserId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '620b828e1f6b15237478a8f9',
        description: '팔로우 대상',
        required: true,
    }),
    (0, mongoose_2.Prop)({ type: mongoose_1.Types.ObjectId, ref: 'users' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], Follow.prototype, "toUserId", void 0);
Follow = __decorate([
    (0, mongoose_2.Schema)(options)
], Follow);
exports.Follow = Follow;
exports.FollowSchema = mongoose_2.SchemaFactory.createForClass(Follow);
exports.FollowSchema.set('toObject', { virtuals: true });
exports.FollowSchema.set('toJSON', { virtuals: true });
exports.FollowSchema.virtual('_toUserId', {
    ref: 'users',
    localField: 'toUserId',
    foreignField: '_id',
});
exports.FollowSchema.virtual('_fromUserId', {
    ref: 'users',
    localField: 'fromUserId',
    foreignField: '_id',
});
//# sourceMappingURL=follow.model.js.map