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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TalkService = void 0;
const common_1 = require("@nestjs/common");
const talk_repository_1 = require("./talk.repository");
let TalkService = class TalkService {
    constructor(talkRepository) {
        this.talkRepository = talkRepository;
    }
    async getMessageList(roomId) {
        return await this.talkRepository.getMessageList(roomId);
    }
    async getRoomList(userId) {
        return await this.talkRepository.getRoomList(userId);
    }
    async sendMessage(talk) {
        const { senderId: buyerId, receiverId: sellerId, toProductId, message, } = talk;
        let isRoom = null;
        isRoom = await this.talkRepository.isRoomBySeller(sellerId, buyerId);
        if (!isRoom) {
            isRoom = await this.talkRepository.isRoomByBuyer(sellerId, buyerId);
        }
        let roomInfo;
        if (!isRoom) {
            roomInfo = await this.talkRepository.createRoom(sellerId, buyerId, toProductId, message);
        }
        else {
            roomInfo = isRoom;
            const updateLastMessage = await this.talkRepository.updateLastMessage(isRoom._id, message);
            console.log('updateLastMessage >> ', updateLastMessage);
        }
        const saveMessage = await this.talkRepository.saveMessage(roomInfo._id, sellerId, buyerId, message);
        console.log('saveMessage >> ', saveMessage);
        return roomInfo;
    }
};
TalkService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [talk_repository_1.TalkRepository])
], TalkService);
exports.TalkService = TalkService;
//# sourceMappingURL=talk.service.js.map