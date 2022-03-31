"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FollowModule = void 0;
const common_1 = require("@nestjs/common");
const follow_controller_1 = require("./follow.controller");
const follow_service_1 = require("./follow.service");
const mongoose_1 = require("@nestjs/mongoose");
const follow_model_1 = require("./model/follow.model");
const follow_repository_1 = require("./follow.repository");
const user_module_1 = require("../user/user.module");
const user_model_1 = require("../user/model/user.model");
let FollowModule = class FollowModule {
};
FollowModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: follow_model_1.Follow.name, schema: follow_model_1.FollowSchema },
                { name: user_model_1.User.name, schema: user_model_1.UserSchema },
            ]),
            (0, common_1.forwardRef)(() => user_module_1.UserModule),
        ],
        controllers: [follow_controller_1.FollowController],
        providers: [follow_service_1.FollowService, follow_repository_1.FollowRepository],
        exports: [follow_service_1.FollowService, follow_repository_1.FollowRepository],
    })
], FollowModule);
exports.FollowModule = FollowModule;
//# sourceMappingURL=follow.module.js.map