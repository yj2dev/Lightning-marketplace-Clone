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
exports.UserRepository = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const user_model_1 = require("../model/user.model");
const mongoose_2 = require("mongoose");
const product_model_1 = require("../../product/model/product.model");
const mongoose = require("mongoose");
const store_contact_model_1 = require("../../store-contact/model/store-contact.model");
const store_review_model_1 = require("../../store-review/model/store-review.model");
let UserRepository = class UserRepository {
    constructor(user, storeContact, storeReview) {
        this.user = user;
        this.storeContact = storeContact;
        this.storeReview = storeReview;
    }
    async deleteStoreReview(commentId) {
        const result = await this.storeReview.findByIdAndDelete(commentId);
        return result;
    }
    async getStoreReviewAll(storeId) {
        const UserModel = mongoose.model('users', user_model_1.UserSchema);
        const result = await this.storeReview
            .find({ toStoreId: mongoose.Types.ObjectId(storeId) })
            .sort({ createdAt: -1 })
            .populate('_fromWriterId', UserModel);
        return result;
    }
    async createStoreReview(userId, storeId, content) {
        const result = await this.storeReview.create({
            toStoreId: mongoose.Types.ObjectId(storeId),
            fromWriterId: mongoose.Types.ObjectId(userId),
            content,
        });
        return result;
    }
    async deleteStoreContact(commentId) {
        const result = await this.storeContact.findByIdAndDelete(commentId);
        return result;
    }
    async getStoreContactAll(storeId) {
        const UserModel = mongoose.model('users', user_model_1.UserSchema);
        const result = await this.storeContact
            .find({ toStoreId: mongoose.Types.ObjectId(storeId) })
            .sort({ createdAt: -1 })
            .populate('_fromWriterId', UserModel);
        return result;
    }
    async createStoreContact(userId, storeId, content) {
        const result = await this.storeContact.create({
            toStoreId: mongoose.Types.ObjectId(storeId),
            fromWriterId: mongoose.Types.ObjectId(userId),
            content,
        });
        return result;
    }
    async deleteUser(id) {
        const result = await this.user.deleteOne({ _id: id });
        return result;
    }
    async findUserByIdAndPopulate(id) {
        const ProductModel = mongoose.model('products', product_model_1.ProductSchema);
        const result = await this.user
            .findById(id)
            .populate('products', ProductModel)
            .select('-password')
            .select('-phoneNumber');
        return result;
    }
    async updateStoreNameById(id, storeName) {
        const result = await this.user.findByIdAndUpdate(id, { storeName }, { new: true });
        console.log('updateStoreNameById result >> ', result);
        return result;
    }
    async updateDescriptionById(id, description) {
        const result = await this.user.findByIdAndUpdate(id, { description }, { new: true });
        console.log('updateStoreNameById result >> ', result);
        return result;
    }
    async updatePasswordById(id, password) {
        const result = await this.user.findByIdAndUpdate(id, { password }, { new: true });
        return result;
    }
    async existsByPhoneNumber(phoneNumber) {
        const result = await this.user.exists({ phoneNumber });
        return result;
    }
    async existsByStoreName(storeName) {
        const result = await this.user.exists({ storeName });
        return result;
    }
    async createUser(userCreateDto) {
        return await this.user.create(userCreateDto);
    }
    async findUserByPhoneNumber(phoneNumber) {
        const user = await this.user.findOne({ phoneNumber });
        return user;
    }
    async findUserByIdWithoutPasswordAndPhoneNumber(userId) {
        const user = await this.user
            .findById(userId)
            .select('-password')
            .select('-phoneNumber');
        return user;
    }
    async findUserById(userId) {
        const user = await this.user.findById(userId);
        return user;
    }
    async findByIdAndUpdateImg(userId, file) {
        const user = await this.user.findById(userId);
        user.profileURL = `${process.env.MEDIA_URL}/static/user_profile/${file[0].filename}`;
        const result = await user.save();
        return result;
    }
    async findByIdAndResetImg(userId) {
        const user = await this.user.findById({ _id: userId });
        user.profileURL = `${process.env.MEDIA_URL}/static/user_profile/__default_store_profile__.png`;
        const result = await user.save();
        return result;
    }
};
UserRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_model_1.User.name)),
    __param(1, (0, mongoose_1.InjectModel)(store_contact_model_1.StoreContact.name)),
    __param(2, (0, mongoose_1.InjectModel)(store_review_model_1.StoreReview.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], UserRepository);
exports.UserRepository = UserRepository;
//# sourceMappingURL=user.repository.js.map