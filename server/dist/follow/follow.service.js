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
exports.FollowService = void 0;
const common_1 = require("@nestjs/common");
const follow_repository_1 = require("./follow.repository");
let FollowService = class FollowService {
    constructor(followReposigory) {
        this.followReposigory = followReposigory;
    }
    async isFollow(toUserId, fromUserId) {
        const isFollow = await this.followReposigory.existFindById(toUserId, fromUserId);
        return isFollow.length ? true : false;
    }
    async following(fromUserId) {
        const result = await this.followReposigory.following(fromUserId);
        return result;
    }
    async follower(toUserId) {
        const result = await this.followReposigory.follower(toUserId);
        return result;
    }
    async followUser(toUserId, fromUserId) {
        const isFollow = await this.followReposigory.existFindById(toUserId, fromUserId);
        let result = null;
        if (isFollow.length === 0) {
            console.log('팔로우 생성');
            result = await this.followReposigory.createFollow(toUserId, fromUserId);
            return true;
        }
        else {
            console.log('팔로우 해제');
            result = await this.followReposigory.deleteFollow(toUserId, fromUserId);
        }
        console.log('follow result >> ', result);
        return false;
    }
};
FollowService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [follow_repository_1.FollowRepository])
], FollowService);
exports.FollowService = FollowService;
//# sourceMappingURL=follow.service.js.map