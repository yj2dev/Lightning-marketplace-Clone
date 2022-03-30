"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const config_1 = require("@nestjs/config");
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const user_controller_1 = require("./user/controller/user.controller");
const user_service_1 = require("./user/service/user.service");
const mongoose_1 = require("@nestjs/mongoose");
const logger_middleware_1 = require("./common/middleware/logger.middleware");
const user_module_1 = require("./user/user.module");
const mongoose = require("mongoose");
const user_model_1 = require("./user/model/user.model");
const user_repository_1 = require("./user/repository/user.repository");
const auth_module_1 = require("./auth/auth.module");
const product_module_1 = require("./product/product.module");
const oauth_module_1 = require("./oauth/oauth.module");
const sms_module_1 = require("./sms/sms.module");
const redis_cache_module_1 = require("./redis-cache/redis-cache.module");
const product_image_module_1 = require("./product-image/product-image.module");
const product_contact_module_1 = require("./product-contact/product-contact.module");
const product_favorite_module_1 = require("./product-favorite/product-favorite.module");
const store_review_module_1 = require("./store-review/store-review.module");
const store_contact_module_1 = require("./store-contact/store-contact.module");
const tag_module_1 = require("./tag/tag.module");
const follow_module_1 = require("./follow/follow.module");
const category_module_1 = require("./category/category.module");
const talk_module_1 = require("./talk/talk.module");
const store_contact_model_1 = require("./store-contact/model/store-contact.model");
const talk_room_module_1 = require("./talk-room/talk-room.module");
const store_review_model_1 = require("./store-review/model/store-review.model");
let AppModule = class AppModule {
    constructor() {
        this.MODE = process.env.NODE_ENV === 'development' ? true : false;
    }
    configure(consumer) {
        consumer.apply(logger_middleware_1.LoggerMiddleware).forRoutes('*');
        mongoose.set('debug', this.MODE);
    }
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            mongoose_1.MongooseModule.forFeature([
                { name: user_model_1.User.name, schema: user_model_1.UserSchema },
                { name: store_contact_model_1.StoreContact.name, schema: store_contact_model_1.StoreContactSchema },
                { name: store_review_model_1.StoreReview.name, schema: store_review_model_1.StoreReviewSchema },
            ]),
            mongoose_1.MongooseModule.forRoot(`mongodb+srv://${process.env.DB_MONGO_ID}:${process.env.DB_MONGO_PASSWORD}@table0.zotlh.mongodb.net/${process.env.DB_MONGO_NAME}?retryWrites=true&w=majority`, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true,
                useFindAndModify: false,
            }),
            user_module_1.UserModule,
            auth_module_1.AuthModule,
            product_module_1.ProductModule,
            oauth_module_1.OauthModule,
            sms_module_1.SmsModule,
            redis_cache_module_1.RedisCacheModule,
            product_image_module_1.ProductImageModule,
            product_contact_module_1.ProductContactModule,
            product_favorite_module_1.ProductFavoriteModule,
            store_review_module_1.StoreReviewModule,
            store_contact_module_1.StoreContactModule,
            tag_module_1.TagModule,
            follow_module_1.FollowModule,
            category_module_1.CategoryModule,
            talk_module_1.TalkModule,
            talk_room_module_1.TalkRoomModule,
        ],
        controllers: [app_controller_1.AppController, user_controller_1.UserController],
        providers: [app_service_1.AppService, user_service_1.UserService, user_repository_1.UserRepository],
        exports: [store_contact_module_1.StoreContactModule, config_1.ConfigModule],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map