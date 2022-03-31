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
exports.TalkRepository = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const talk_model_1 = require("./model/talk.model");
const mongoose_2 = require("mongoose");
const mongoose = require("mongoose");
const room_model_1 = require("../talk-room/model/room.model");
const user_model_1 = require("../user/model/user.model");
let TalkRepository = class TalkRepository {
    constructor(talk, room, user) {
        this.talk = talk;
        this.room = room;
        this.user = user;
    }
    async updateLastMessage(roomId, message) {
        const result = await this.room.findOneAndUpdate({ _id: mongoose.Types.ObjectId(roomId) }, { lastContent: message });
        return result;
    }
    async getMessageList(roomId) {
        const userModel = mongoose.model('users', user_model_1.UserSchema);
        const result = await this.talk
            .find({
            roomId: mongoose.Types.ObjectId(roomId),
        })
            .populate('_toUserId', userModel)
            .populate('_fromUserId', userModel);
        return result;
    }
    async getRoomList(userId) {
        const userModel = mongoose.model('users', user_model_1.UserSchema);
        const sellerOfResult = await this.room
            .find({
            sellerId: mongoose.Types.ObjectId(userId),
        })
            .populate('_sellerId', userModel)
            .populate('_buyerId', userModel);
        const buyerOfResult = await this.room
            .find({
            buyerId: mongoose.Types.ObjectId(userId),
        })
            .populate('_sellerId', userModel)
            .populate('_buyerId', userModel);
        if (sellerOfResult && buyerOfResult) {
            const result = Object.assign(Object.assign({}, sellerOfResult), buyerOfResult);
            return result;
        }
        if (sellerOfResult)
            return sellerOfResult;
        else if (buyerOfResult)
            return buyerOfResult;
        else
            return null;
    }
    async isRoomBySeller(sellerId, buyerId) {
        console.log('sellerId >> ', sellerId);
        console.log('buyerId >> ', buyerId);
        const result = this.room.findOne({
            sellerId: mongoose.Types.ObjectId(sellerId),
            buyerId: mongoose.Types.ObjectId(buyerId),
        });
        return result;
    }
    async isRoomByBuyer(sellerId, buyerId) {
        console.log('sellerId >> ', sellerId);
        console.log('buyerId >> ', buyerId);
        const result = this.room.findOne({
            sellerId: mongoose.Types.ObjectId(buyerId),
            buyerId: mongoose.Types.ObjectId(sellerId),
        });
        return result;
    }
    async createRoom(sellerId, buyerId, toProductId, message) {
        const result = this.room.create({
            sellerId: mongoose.Types.ObjectId(sellerId),
            buyerId: mongoose.Types.ObjectId(buyerId),
            toProductId: mongoose.Types.ObjectId(toProductId),
            lastContent: message,
        });
        console.log('create room result >> ', result);
        return result;
    }
    async saveMessage(roomId, toUserId, fromUserId, message) {
        const result = this.talk.create({
            roomId: mongoose.Types.ObjectId(roomId),
            toUserId: mongoose.Types.ObjectId(toUserId),
            fromUserId: mongoose.Types.ObjectId(fromUserId),
            content: message,
        });
        return result;
    }
};
TalkRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(talk_model_1.Talk.name)),
    __param(1, (0, mongoose_1.InjectModel)(room_model_1.Room.name)),
    __param(2, (0, mongoose_1.InjectModel)(user_model_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], TalkRepository);
exports.TalkRepository = TalkRepository;
//# sourceMappingURL=talk.repository.js.map