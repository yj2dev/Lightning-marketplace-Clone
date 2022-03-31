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
exports.TalkGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const common_1 = require("@nestjs/common");
const talk_service_1 = require("./talk.service");
let TalkGateway = class TalkGateway {
    constructor(talkService) {
        this.talkService = talkService;
        this.logger = new common_1.Logger('Talk');
        this.logger.log('constructor talk...');
    }
    afterInit() {
        this.logger.log('init talk...');
    }
    handleConnection(socket) {
        this.logger.log(`connected socket[nsp, id] >> ["${socket.nsp.name}", "${socket.id}"]`);
    }
    handleDisconnect(socket) {
        this.logger.log(`disconnected socket[nsp, id] >> ["${socket.nsp.name}", "${socket.id}"]`);
    }
    async handleSubmitTalk(talk, socket) {
        console.log('talk >> ', talk);
        const roomInfo = await this.talkService.sendMessage(talk.save);
        console.log('roomInfo >> ', roomInfo);
        socket.broadcast.emit(`${roomInfo._id}-receiveMessage`, talk.receive);
        return talk.receive;
    }
    async socketTest(body, socket) {
        console.log('body >> ', body);
        socket.broadcast.emit('socketReturn', body);
    }
};
__decorate([
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], TalkGateway.prototype, "handleConnection", null);
__decorate([
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], TalkGateway.prototype, "handleDisconnect", null);
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], TalkGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('sendMessage'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], TalkGateway.prototype, "handleSubmitTalk", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('socketTest'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], TalkGateway.prototype, "socketTest", null);
TalkGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: true,
        namespace: /\/nsp-.+/,
    }),
    __metadata("design:paramtypes", [talk_service_1.TalkService])
], TalkGateway);
exports.TalkGateway = TalkGateway;
//# sourceMappingURL=talk.gateway.js.map