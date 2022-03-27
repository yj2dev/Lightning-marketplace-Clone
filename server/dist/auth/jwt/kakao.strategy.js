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
exports.KakaoStrategy = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const user_repository_1 = require("../../user/repository/user.repository");
const passport_kakao_1 = require("passport-kakao");
let KakaoStrategy = class KakaoStrategy extends (0, passport_1.PassportStrategy)(passport_kakao_1.Strategy) {
    constructor(userRepository) {
        super({
            clientID: process.env.KAKAO_AUTH_REST_API_KEY,
            clientSecret: process.env.KAKAO_AUTH_CLIENT_SECRET,
            callbackURL: process.env.KAKAO_AUTH_REDIRECT_URI,
        });
        this.userRepository = userRepository;
    }
    async validate(accessToken, refreshToken, profile, done) {
        console.log('[ Kakao validate ]');
        console.log('accessToken >> ', accessToken);
        console.log('refreshToken >> ', refreshToken);
        console.log('profile >> ', profile);
        console.log('done >> ', done);
        return done(null, 'kakao succeed');
    }
};
KakaoStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_repository_1.UserRepository])
], KakaoStrategy);
exports.KakaoStrategy = KakaoStrategy;
//# sourceMappingURL=kakao.strategy.js.map