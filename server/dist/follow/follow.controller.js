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
exports.FollowController = void 0;
const common_1 = require("@nestjs/common");
const success_interceptor_1 = require("../common/interceptor/success.interceptor");
const http_exception_filter_1 = require("../common/exception/http-exception.filter");
const follow_service_1 = require("./follow.service");
const user_decorator_1 = require("../common/decorators/user.decorator");
const jwt_guard_1 = require("../auth/guard/jwt.guard");
let FollowController = class FollowController {
    constructor(followService) {
        this.followService = followService;
    }
    async isFollow(currentUser, userId) {
        console.log(currentUser._id, userId);
        return await this.followService.isFollow(userId, currentUser._id);
    }
    async getFollowing(userId) {
        return await this.followService.following(userId);
    }
    async getFollower(userId) {
        return await this.followService.follower(userId);
    }
};
__decorate([
    (0, common_1.Get)(':userId/exist'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    __param(0, (0, user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], FollowController.prototype, "isFollow", null);
__decorate([
    (0, common_1.Get)(':userId/following'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FollowController.prototype, "getFollowing", null);
__decorate([
    (0, common_1.Get)(':userId/follower'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FollowController.prototype, "getFollower", null);
FollowController = __decorate([
    (0, common_1.Controller)('follow'),
    (0, common_1.UseInterceptors)(success_interceptor_1.SuccessInterceptor),
    (0, common_1.UseFilters)(http_exception_filter_1.HttpExceptionFilter),
    __metadata("design:paramtypes", [follow_service_1.FollowService])
], FollowController);
exports.FollowController = FollowController;
//# sourceMappingURL=follow.controller.js.map