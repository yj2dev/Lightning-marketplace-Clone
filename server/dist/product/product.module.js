"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModule = void 0;
const common_1 = require("@nestjs/common");
const product_controller_1 = require("./controller/product.controller");
const product_service_1 = require("./service/product.service");
const product_repository_1 = require("./repository/product.repository");
const mongoose_1 = require("@nestjs/mongoose");
const user_model_1 = require("../user/model/user.model");
const product_model_1 = require("./model/product.model");
const product_image_model_1 = require("../product-image/model/product-image.model");
const tag_model_1 = require("../tag/model/tag.model");
const tag_module_1 = require("../tag/tag.module");
const product_favorite_model_1 = require("../product-favorite/model/product-favorite.model");
const product_contact_model_1 = require("../product-contact/model/product-contact.model");
const config_1 = require("@nestjs/config");
let ProductModule = class ProductModule {
};
ProductModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot(),
            mongoose_1.MongooseModule.forFeature([
                { name: user_model_1.User.name, schema: user_model_1.UserSchema },
                { name: product_model_1.Product.name, schema: product_model_1.ProductSchema },
                { name: product_image_model_1.ProductImage.name, schema: product_image_model_1.ProductImageSchema },
                { name: product_favorite_model_1.ProductFavorite.name, schema: product_favorite_model_1.ProductFavoriteSchema },
                { name: product_contact_model_1.ProductContact.name, schema: product_contact_model_1.ProductContactSchema },
                { name: tag_model_1.Tag.name, schema: tag_model_1.TagSchema },
            ]),
            tag_module_1.TagModule,
        ],
        controllers: [product_controller_1.ProductController],
        providers: [product_service_1.ProductService, product_repository_1.ProductRepository],
    })
], ProductModule);
exports.ProductModule = ProductModule;
//# sourceMappingURL=product.module.js.map