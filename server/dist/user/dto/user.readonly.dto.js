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
exports.UserReadonlyDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const user_model_1 = require("../model/user.model");
class UserReadonlyDto extends (0, swagger_1.PickType)(user_model_1.User, ['storeName']) {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '61e38293318e650dca5e6ed5358',
        description: '_id',
    }),
    __metadata("design:type", String)
], UserReadonlyDto.prototype, "_id", void 0);
exports.UserReadonlyDto = UserReadonlyDto;
//# sourceMappingURL=user.readonly.dto.js.map