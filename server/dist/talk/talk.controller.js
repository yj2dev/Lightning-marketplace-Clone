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
exports.TalkController = void 0;
const common_1 = require("@nestjs/common");
const talk_service_1 = require("./talk.service");
console.log('[ talk environment ]');
console.log(process.env.AWS_S3_BUCKET_NAME);
console.log(process.env.AWS_S3_REGION);
let TalkController = class TalkController {
    constructor(talkService) {
        this.talkService = talkService;
    }
    async getMessageList(userId) {
        return await this.talkService.getRoomList(userId);
    }
    async getRoomList(roomId) {
        return await this.talkService.getMessageList(roomId);
    }
};
__decorate([
    (0, common_1.Get)(':userId/room-list'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TalkController.prototype, "getMessageList", null);
__decorate([
    (0, common_1.Get)(':roomId/message-list'),
    __param(0, (0, common_1.Param)('roomId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TalkController.prototype, "getRoomList", null);
TalkController = __decorate([
    (0, common_1.Controller)('talk'),
    __metadata("design:paramtypes", [talk_service_1.TalkService])
], TalkController);
exports.TalkController = TalkController;
//# sourceMappingURL=talk.controller.js.map