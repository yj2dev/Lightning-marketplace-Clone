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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("../service/user.service");
const http_exception_filter_1 = require("../../common/exception/http-exception.filter");
const success_interceptor_1 = require("../../common/interceptor/success.interceptor");
const swagger_1 = require("@nestjs/swagger");
const user_readonly_dto_1 = require("../dto/user.readonly.dto");
const user_request_dto_1 = require("../dto/user.request.dto");
const auth_service_1 = require("../../auth/auth.service");
const user_signin_dto_1 = require("../../auth/dto/user.signin.dto");
const jwt_guard_1 = require("../../auth/guard/jwt.guard");
const user_decorator_1 = require("../../common/decorators/user.decorator");
const platform_express_1 = require("@nestjs/platform-express");
const user_model_1 = require("../model/user.model");
const follow_service_1 = require("../../follow/follow.service");
const AWS = require("aws-sdk");
const multerS3 = require("multer-s3");
const s3 = new AWS.S3({
    accessKeyId: 'AKIAX4Y3ZI6IZIOLPDKD',
    secretAccessKey: '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',
    region: 'us-west-1',
});
console.log('[ user environment ]');
console.log(process.env.AWS_S3_BUCKET_NAME);
console.log(process.env.AWS_S3_REGION);
let UserController = class UserController {
    constructor(userService, authService, followService) {
        this.userService = userService;
        this.authService = authService;
        this.followService = followService;
    }
    async deleteProductReview(commentId, currentUser) {
        return await this.userService.deleteStoreReview(commentId);
    }
    async getProductReview(storeId) {
        console.log('storeId >> ', storeId);
        return await this.userService.getStoreReview(storeId);
    }
    async createProductReview(storeId, content, currentUser) {
        return await this.userService.createStoreReview(currentUser._id, storeId, content);
    }
    async deleteProductContact(commentId, currentUser) {
        return await this.userService.deleteStoreContact(commentId);
    }
    async getProductContact(storeId) {
        console.log('storeId >> ', storeId);
        return await this.userService.getStoreContact(storeId);
    }
    async createProductContact(storeId, content, currentUser) {
        return await this.userService.createStoreContact(currentUser._id, storeId, content);
    }
    async createFollow(currentUser, toUserId) {
        return await this.followService.followUser(toUserId, currentUser._id);
    }
    async deleteAccount(currentUser, phoneNumber, password) {
        return await this.userService.deleteAccount(currentUser._id, phoneNumber, password);
    }
    async updatePassword(currentUser, currentPassword, password, res) {
        const result = await this.authService.jwtCheckAccount(currentUser._id, currentPassword, password);
        console.log('result >>', result);
        if (!result)
            throw new common_1.UnauthorizedException('비밀번호 변경에 실패했습니다.');
        res.clearCookie('jwt');
    }
    async getDetailUser(userId) {
        return await this.userService.getDetailUser(userId);
    }
    async updateDescription(currentUser, description) {
        return this.userService.updateDescription(currentUser._id, description);
    }
    async updateNickname(currentUser, storeName) {
        console.log('curr user >> ', currentUser, storeName);
        return this.userService.updateStoreName(currentUser._id, storeName);
    }
    async authUser(currentUser) {
        return currentUser;
    }
    async signUp(userRequestDto) {
        return await this.userService.signup(userRequestDto);
    }
    async signin(userSigninDto, res) {
        console.log(process.env.AWS_S3_REGION);
        const { jwt, user } = await this.authService.jwtSignin(userSigninDto);
        res.cookie('jwt', jwt, { httpOnly: true });
        return user.readonlyData;
    }
    async signout(res) {
        res.clearCookie('jwt');
    }
    async isUser(phoneNumber) {
        return await this.userService.isPhoneNumber(phoneNumber);
    }
    async uploadProfileImg(currentUser, file) {
        console.log('profile ... ');
        console.log('env33');
        console.log(process.env.AWS_S3_BUCKET_NAME);
        console.log(process.env.AWS_S3_REGION);
        return this.userService.uploadImg(currentUser._id, file[0]);
    }
    resetProfileImg(currentUser) {
        return this.userService.resetImg(currentUser._id);
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '상점후기 삭제' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: '성공' }),
    (0, swagger_1.ApiResponse)({ status: 500, description: '서버 에러' }),
    (0, common_1.Delete)('/:commentId/review'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('commentId')),
    __param(1, (0, user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_model_1.User]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteProductReview", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '상점후기 가져오기' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: '성공' }),
    (0, swagger_1.ApiResponse)({ status: 500, description: '서버 에러' }),
    (0, common_1.Get)('/:storeId/review'),
    __param(0, (0, common_1.Param)('storeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getProductReview", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '상점후기 저장' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: '성공' }),
    (0, swagger_1.ApiResponse)({ status: 500, description: '서버 에러' }),
    (0, common_1.Post)('/:storeId/review'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('storeId')),
    __param(1, (0, common_1.Body)('content')),
    __param(2, (0, user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, user_model_1.User]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createProductReview", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '상점문의 삭제' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: '성공' }),
    (0, swagger_1.ApiResponse)({ status: 500, description: '서버 에러' }),
    (0, common_1.Delete)('/:commentId/contact'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('commentId')),
    __param(1, (0, user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_model_1.User]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteProductContact", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '상점문의 가져오기' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: '성공' }),
    (0, swagger_1.ApiResponse)({ status: 500, description: '서버 에러' }),
    (0, common_1.Get)('/:storeId/contact'),
    __param(0, (0, common_1.Param)('storeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getProductContact", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '상점문의 저장' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: '성공' }),
    (0, swagger_1.ApiResponse)({ status: 500, description: '서버 에러' }),
    (0, common_1.Post)('/:storeId/contact'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('storeId')),
    __param(1, (0, common_1.Body)('content')),
    __param(2, (0, user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, user_model_1.User]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createProductContact", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '팔로우' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: '성공' }),
    (0, swagger_1.ApiResponse)({ status: 500, description: '서버 에러' }),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Post)('follow/:toUserId'),
    __param(0, (0, user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('toUserId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createFollow", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '회원탈퇴' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '성공' }),
    (0, swagger_1.ApiResponse)({ status: 500, description: '서버 에러' }),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Delete)('account'),
    __param(0, (0, user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)('phoneNumber')),
    __param(2, (0, common_1.Body)('password')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteAccount", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '유저 비밀번호 변경' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '성공' }),
    (0, swagger_1.ApiResponse)({ status: 500, description: '서버 에러' }),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Patch)('password'),
    __param(0, (0, user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)('currentPassword')),
    __param(2, (0, common_1.Body)('password')),
    __param(3, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updatePassword", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '유저와 연관된 모든 정보 요청' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '성공' }),
    (0, swagger_1.ApiResponse)({ status: 500, description: '서버 에러' }),
    (0, common_1.Get)('detail/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getDetailUser", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '유저(상점) 자기소개(상점설명) 변경' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '성공' }),
    (0, swagger_1.ApiResponse)({ status: 500, description: '서버 에러' }),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Patch)('description'),
    __param(0, (0, user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)('description')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateDescription", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '유저(상점) 닉네임(상점명) 변경' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '성공' }),
    (0, swagger_1.ApiResponse)({ status: 500, description: '서버 에러' }),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Patch)('nickname'),
    __param(0, (0, user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)('storeName')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateNickname", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '유저인증' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '성공', type: user_readonly_dto_1.UserReadonlyDto }),
    (0, swagger_1.ApiResponse)({ status: 500, description: '서버 에러' }),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Get)('auth'),
    __param(0, (0, user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "authUser", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '회원가입' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '성공', type: user_request_dto_1.UserRequestDto }),
    (0, swagger_1.ApiResponse)({ status: 500, description: '서버 에러' }),
    (0, common_1.Post)('signup'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_request_dto_1.UserRequestDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "signUp", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '로그인' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '성공', type: user_signin_dto_1.UserSigninDto }),
    (0, swagger_1.ApiResponse)({ status: 500, description: '서버 에러' }),
    (0, common_1.Post)('signin'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_signin_dto_1.UserSigninDto, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "signin", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '로그아웃' }),
    (0, common_1.Get)('signout'),
    __param(0, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "signout", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '유저 회원가입 여부 조회' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: '유저가 존재함',
        type: user_readonly_dto_1.UserReadonlyDto,
    }),
    (0, swagger_1.ApiResponse)({ status: 409, description: '유저가 존재하지 않음' }),
    (0, common_1.Get)('check'),
    __param(0, (0, common_1.Query)('phoneNumber')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "isUser", null);
__decorate([
    (0, common_1.Patch)('profile/upload'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('image', 1, {
        storage: multerS3({
            s3: s3,
            bucket: 'lightningmarket-s3',
            acl: 'public-read',
            key: function (req, file, cb) {
                cb(null, `profile/${Date.now().toString()}-${file.originalname}`);
            },
        }),
        limits: {},
    })),
    __param(0, (0, user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_model_1.User, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "uploadProfileImg", null);
__decorate([
    (0, common_1.Patch)('profile/reset'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    __param(0, (0, user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_model_1.User]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "resetProfileImg", null);
UserController = __decorate([
    (0, common_1.Controller)('user'),
    (0, common_1.UseInterceptors)(success_interceptor_1.SuccessInterceptor),
    (0, common_1.UseFilters)(http_exception_filter_1.HttpExceptionFilter),
    __metadata("design:paramtypes", [user_service_1.UserService,
        auth_service_1.AuthService,
        follow_service_1.FollowService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map