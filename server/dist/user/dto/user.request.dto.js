"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRequestDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const user_model_1 = require("../model/user.model");
class UserRequestDto extends (0, swagger_1.PickType)(user_model_1.User, [
    'phoneNumber',
    'password',
]) {
}
exports.UserRequestDto = UserRequestDto;
//# sourceMappingURL=user.request.dto.js.map