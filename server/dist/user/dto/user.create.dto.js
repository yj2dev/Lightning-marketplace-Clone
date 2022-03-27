"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserCreateDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const user_model_1 = require("../model/user.model");
class UserCreateDto extends (0, swagger_1.PickType)(user_model_1.User, [
    'phoneNumber',
    'password',
    'storeName',
]) {
}
exports.UserCreateDto = UserCreateDto;
//# sourceMappingURL=user.create.dto.js.map