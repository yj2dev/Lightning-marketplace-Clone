"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TalkModule = void 0;
const common_1 = require("@nestjs/common");
const talk_gateway_1 = require("./talk.gateway");
const talk_service_1 = require("./talk.service");
const mongoose_1 = require("@nestjs/mongoose");
const talk_model_1 = require("./model/talk.model");
const room_model_1 = require("../talk-room/model/room.model");
const talk_repository_1 = require("./talk.repository");
const talk_controller_1 = require("./talk.controller");
const user_model_1 = require("../user/model/user.model");
const user_module_1 = require("../user/user.module");
let TalkModule = class TalkModule {
};
TalkModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: talk_model_1.Talk.name, schema: talk_model_1.TalkSchema },
                { name: room_model_1.Room.name, schema: room_model_1.RoomSchema },
                { name: user_model_1.User.name, schema: user_model_1.UserSchema },
            ]),
            user_module_1.UserModule,
        ],
        providers: [talk_gateway_1.TalkGateway, talk_service_1.TalkService, talk_repository_1.TalkRepository],
        controllers: [talk_controller_1.TalkController],
    })
], TalkModule);
exports.TalkModule = TalkModule;
//# sourceMappingURL=talk.module.js.map