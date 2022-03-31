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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRepository = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const product_model_1 = require("../model/product.model");
const product_image_model_1 = require("../../product-image/model/product-image.model");
const mongoose = require("mongoose");
const user_model_1 = require("../../user/model/user.model");
const product_favorite_model_1 = require("../../product-favorite/model/product-favorite.model");
const product_contact_model_1 = require("../../product-contact/model/product-contact.model");
let ProductRepository = class ProductRepository {
    constructor(product, productImage, productFavorite, productContact) {
        this.product = product;
        this.productImage = productImage;
        this.productFavorite = productFavorite;
        this.productContact = productContact;
    }
    async searchTitleByKeyword(keyword) {
        const result = await this.product.find({ title: new RegExp(keyword) });
        return result;
    }
    async getProductFavorite(userId) {
        const ProductModel = mongoose.model('products', product_model_1.ProductSchema);
        const result = await this.productFavorite
            .find({ toStoreId: userId })
            .sort({ createdAt: -1 })
            .populate('_fromProductId', ProductModel);
        return result;
    }
    async getProductContactAll(productId) {
        const UserModel = mongoose.model('users', user_model_1.UserSchema);
        const result = await this.productContact
            .find({ toStoreId: mongoose.Types.ObjectId(productId) })
            .sort({ createdAt: -1 })
            .populate('_fromWriterId', UserModel);
        console.log('result contact >> ', result);
        return result;
    }
    async createProductContact(userId, productId, content) {
        const result = await this.productContact.create({
            toStoreId: mongoose.Types.ObjectId(productId),
            fromWriterId: mongoose.Types.ObjectId(userId),
            content,
        });
        return result;
    }
    async deleteProductContact(askId) {
        const result = await this.productContact.findByIdAndDelete(askId);
        return result;
    }
    async createProductFavorite(userId, productId) {
        const result = await this.productFavorite.create({
            toStoreId: mongoose.Types.ObjectId(userId),
            fromProductId: mongoose.Types.ObjectId(productId),
        });
        return result;
    }
    async deleteProductFavorite(userId, productId) {
        const result = await this.productFavorite.deleteOne({
            toStoreId: mongoose.Types.ObjectId(userId),
            fromProductId: mongoose.Types.ObjectId(productId),
        });
        return result;
    }
    async findByIdProductFavorite(userId, productId) {
        const result = await this.productFavorite.findOne({
            toStoreId: mongoose.Types.ObjectId(userId),
            fromProductId: mongoose.Types.ObjectId(productId),
        });
        return result;
    }
    async deleteHardProduct(productId) {
        const result = await this.product.deleteOne({ _id: productId });
        console.log('result >> ', result);
        return result;
    }
    async updateProduct(productId, field) {
        const result = await this.product.findOneAndUpdate({ _id: productId }, Object.assign({}, field), { new: true });
        console.log('result >> ', result);
        return result;
    }
    async findByIdAndPopulate(id) {
        const UserModel = mongoose.model('users', user_model_1.UserSchema);
        const ProductImageModel = mongoose.model('productimages', product_image_model_1.ProductImageSchema);
        const ProductContactModel = mongoose.model('productcontacts', product_contact_model_1.ProductContactSchema);
        const ProductFavoriteModel = mongoose.model('productfavorites', product_favorite_model_1.ProductFavoriteSchema);
        const result = await this.product
            .findById(id)
            .populate('productImgURLs', ProductImageModel)
            .populate('userInfo', UserModel)
            .populate('productFavoriteCount', ProductFavoriteModel)
            .populate('productContacts', ProductContactModel);
        return result;
    }
    async getAllProduct() {
        return this.product.find().sort({ createdAt: -1 });
    }
    async uploadProduct(currentUser, productInfo) {
        const userId = currentUser._id;
        const result = await this.product.create(Object.assign({ userId }, productInfo));
        return result._id;
    }
    async uploadProductImage(productId, files) {
        try {
            if (files && files[0]) {
                const product = await this.product.findById(productId);
                product.thumbnailImgURL = `${files[0].location}`;
                await product.save();
            }
            for (const file of files) {
                const productImgURL = `${file.location}`;
                await this.productImage.create({
                    productId,
                    productImgURL,
                });
            }
            return true;
        }
        catch (err) {
            return false;
        }
    }
};
ProductRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(product_model_1.Product.name)),
    __param(1, (0, mongoose_1.InjectModel)(product_image_model_1.ProductImage.name)),
    __param(2, (0, mongoose_1.InjectModel)(product_favorite_model_1.ProductFavorite.name)),
    __param(3, (0, mongoose_1.InjectModel)(product_contact_model_1.ProductContact.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], ProductRepository);
exports.ProductRepository = ProductRepository;
//# sourceMappingURL=product.repository.js.map