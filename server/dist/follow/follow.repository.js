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
exports.FollowRepository = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const follow_model_1 = require("./model/follow.model");
const mongoose_2 = require("mongoose");
const mongoose = require("mongoose");
const user_model_1 = require("../user/model/user.model");
let FollowRepository = class FollowRepository {
    constructor(follow, user) {
        this.follow = follow;
        this.user = user;
    }
    async following(fromUserId) {
        const userModel = mongoose.model('users', user_model_1.UserSchema);
        const result = await this.follow
            .find({
            fromUserId: mongoose.Types.ObjectId(fromUserId),
        })
            .populate('_toUserId', userModel);
        return result;
    }
    async follower(toUserId) {
        const userModel = mongoose.model('users', user_model_1.UserSchema);
        const result = await this.follow
            .find({
            toUserId: mongoose.Types.ObjectId(toUserId),
        })
            .populate('_fromUserId', userModel);
        return result;
    }
    async existFindById(toUserId, fromUserId) {
        const result = await this.follow.find({
            toUserId: mongoose.Types.ObjectId(toUserId),
            fromUserId: mongoose.Types.ObjectId(fromUserId),
        });
        return result;
    }
    async createFollow(toUserId, fromUserId) {
        const result = await this.follow.create({
            toUserId: mongoose.Types.ObjectId(toUserId),
            fromUserId: mongoose.Types.ObjectId(fromUserId),
        });
        return result;
    }
    async deleteFollow(toUserId, fromUserId) {
        const result = await this.follow.deleteOne({
            toUserId: mongoose.Types.ObjectId(toUserId),
            fromUserId: mongoose.Types.ObjectId(fromUserId),
        });
        return result;
    }
};
FollowRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(follow_model_1.Follow.name)),
    __param(1, (0, mongoose_1.InjectModel)(user_model_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], FollowRepository);
exports.FollowRepository = FollowRepository;
//# sourceMappingURL=follow.repository.js.map