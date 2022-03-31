"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProductDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const product_model_1 = require("../model/product.model");
class CreateProductDto extends (0, swagger_1.PickType)(product_model_1.Product, [
    'address',
    'containDeliveryCharge',
    'description',
    'enableExchange',
    'largeCateogry',
    'mediumCategory',
    'newProduct',
    'price',
    'quantity',
    'smallCategory',
    'tag',
    'title',
]) {
}
exports.CreateProductDto = CreateProductDto;
//# sourceMappingURL=create.product.dto.js.map