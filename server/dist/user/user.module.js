"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModule = void 0;
const common_1 = require("@nestjs/common");
const user_controller_1 = require("./controller/user.controller");
const user_service_1 = require("./service/user.service");
const mongoose_1 = require("@nestjs/mongoose");
const user_model_1 = require("./model/user.model");
const user_repository_1 = require("./repository/user.repository");
const auth_module_1 = require("../auth/auth.module");
const follow_module_1 = require("../follow/follow.module");
const store_contact_model_1 = require("../store-contact/model/store-contact.model");
const store_review_model_1 = require("../store-review/model/store-review.model");
const config_1 = require("@nestjs/config");
let UserModule = class UserModule {
};
UserModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot(),
            mongoose_1.MongooseModule.forFeature([
                { name: user_model_1.User.name, schema: user_model_1.UserSchema },
                { name: store_contact_model_1.StoreContact.name, schema: store_contact_model_1.StoreContactSchema },
                { name: store_review_model_1.StoreReview.name, schema: store_review_model_1.StoreReviewSchema },
            ]),
            (0, common_1.forwardRef)(() => follow_module_1.FollowModule),
            (0, common_1.forwardRef)(() => auth_module_1.AuthModule),
        ],
        controllers: [user_controller_1.UserController],
        providers: [user_service_1.UserService, user_repository_1.UserRepository],
        exports: [user_service_1.UserService, user_repository_1.UserRepository],
    })
], UserModule);
exports.UserModule = UserModule;
//# sourceMappingURL=user.module.js.map