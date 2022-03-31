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
exports.OauthController = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("axios");
const qs = require("qs");
const cache = require("memory-cache");
const naver_auth_guard_1 = require("../auth/guard/naver-auth.guard");
const kakao_auth_guard_1 = require("../auth/guard/kakao-auth.guard");
let OauthController = class OauthController {
    constructor() {
        this.KAKAO_REST_API_KEY = process.env.KAKAO_AUTH_REST_API_KEY;
        this.KAKAO_REDIRECT_URI = process.env.KAKAO_AUTH_REDIRECT_URI;
        this.KAKAO_CLIENT_SECRET = process.env.KAKAO_AUTH_CLIENT_SECRET;
        this.NAVER_CLIENT_ID = process.env.NAVER_AUTH_CLIENT_ID;
        this.NAVER_CLIENT_SECRET = process.env.NAVER_AUTH_CLIENT_SECRET;
        this.NAVER_REDIRECT_URI = process.env.NAVER_AUTH_REDIRECT_URI;
    }
    naverlogin() {
        return;
    }
    async naverLoginCallback(req) {
        console.log('naver callback user', req.user);
        return req.user;
    }
    async kakaoLogin() {
        return;
    }
    async kakaoLoginCallback(req) {
        console.log('kakao callback user', req.user);
        return req.user;
    }
    async testGet(code) {
        console.log('oauth get');
        console.log('code >> ', code);
        const payload = {
            grant_type: 'authorization_code',
            client_id: this.KAKAO_REST_API_KEY,
            redirect_uri: this.KAKAO_REDIRECT_URI,
            code,
            client_secret: this.KAKAO_CLIENT_SECRET,
        };
        const queryStringPayload = qs.stringify(payload);
        console.log('payload >> ', payload);
        console.log('queryStringPayload >> ', queryStringPayload);
        const getToken = async () => {
            try {
                const res = await axios_1.default.post('https://kauth.kakao.com/oauth/token', queryStringPayload, {
                    headers: {
                        'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
                    },
                });
                console.log('getToken res data >> ', res.data);
                return res.data;
            }
            catch (err) {
                console.log('getToken err >> ', err);
            }
        };
        const getUser = async (access_token) => {
            if (!access_token)
                return;
            try {
                const res = await axios_1.default.get('https://kapi.kakao.com/v2/user/me', {
                    headers: {
                        'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
                        authorization: `Bearer ${access_token}`,
                    },
                });
                console.log('getUser res data >> ', res.data);
                return res.data;
            }
            catch (err) {
                console.log('getUser err >> ', err);
            }
        };
        const token = await getToken();
        const user = await getUser(token.access_token);
        return user;
    }
    createCache23() {
        return 'succeed';
    }
    createCache233() {
        return 'suc3213ceed';
    }
    createCache() {
        cache.put('undefined102', 'value102');
        cache.put('undefined106', 'value106', 1000, (key, value) => {
            console.log(`[${key}]: ${value} 등록!`);
            return 'succeed';
        });
        return 'succeed';
    }
    showCache(key) {
        console.log(key);
        console.log(cache.size());
        console.log(cache.get(key));
        return 'succeed';
    }
    deleteCache() {
        cache.put('undefined102', 'value102');
        return 'succeed';
    }
};
__decorate([
    (0, common_1.Get)('/naver'),
    (0, common_1.UseGuards)(naver_auth_guard_1.NaverAuthGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], OauthController.prototype, "naverlogin", null);
__decorate([
    (0, common_1.Get)('/naver/callback'),
    (0, common_1.UseGuards)(naver_auth_guard_1.NaverAuthGuard),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OauthController.prototype, "naverLoginCallback", null);
__decorate([
    (0, common_1.Get)('/kakao'),
    (0, common_1.UseGuards)(kakao_auth_guard_1.KakaoAuthGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OauthController.prototype, "kakaoLogin", null);
__decorate([
    (0, common_1.Get)('/kakao/callback'),
    (0, common_1.UseGuards)(kakao_auth_guard_1.KakaoAuthGuard),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OauthController.prototype, "kakaoLoginCallback", null);
__decorate([
    (0, common_1.Get)('/kakao/unused'),
    __param(0, (0, common_1.Query)('code')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OauthController.prototype, "testGet", null);
__decorate([
    (0, common_1.Get)('/cache'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], OauthController.prototype, "createCache23", null);
__decorate([
    (0, common_1.Get)('/cache/good'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], OauthController.prototype, "createCache233", null);
__decorate([
    (0, common_1.Get)('/cache/create'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], OauthController.prototype, "createCache", null);
__decorate([
    (0, common_1.Get)('/cache/show/:key'),
    __param(0, (0, common_1.Param)('key')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], OauthController.prototype, "showCache", null);
__decorate([
    (0, common_1.Get)('/cache/delete'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], OauthController.prototype, "deleteCache", null);
OauthController = __decorate([
    (0, common_1.Controller)('oauth')
], OauthController);
exports.OauthController = OauthController;
//# sourceMappingURL=oauth.controller.js.map