"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSigninDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const user_model_1 = require("../../user/model/user.model");
class UserSigninDto extends (0, swagger_1.PickType)(user_model_1.User, [
    'phoneNumber',
    'password',
]) {
}
exports.UserSigninDto = UserSigninDto;
//# sourceMappingURL=user.signin.dto.js.map