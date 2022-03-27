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
exports.TagSchema = exports.Tag = void 0;
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const options = {
    timestamps: false,
    versionKey: false,
};
let Tag = class Tag extends mongoose_1.Document {
};
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '#오렌지',
        description: '태그명(중복가능)',
        required: true,
    }),
    (0, mongoose_2.Prop)({}),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Tag.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '620afacc4b13710ca520168e',
        description: '해당 태그를 사용한 상품게시글 아이디',
        required: true,
    }),
    (0, mongoose_2.Prop)({ type: mongoose_1.Types.ObjectId, ref: 'products' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], Tag.prototype, "toProductId", void 0);
Tag = __decorate([
    (0, mongoose_2.Schema)(options)
], Tag);
exports.Tag = Tag;
exports.TagSchema = mongoose_2.SchemaFactory.createForClass(Tag);
//# sourceMappingURL=tag.model.js.map