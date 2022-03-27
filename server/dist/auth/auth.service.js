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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const user_repository_1 = require("../user/repository/user.repository");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    constructor(userRepository, jwtService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }
    async jwtCheckAccount(userId, currentPassword, password) {
        console.log('userId >> ', userId);
        console.log('currentPassword >> ', currentPassword);
        console.log('password >> ', password);
        const isUser = await this.userRepository.findUserById(userId);
        console.log('isUser >> ', isUser);
        if (!isUser)
            throw new common_1.UnauthorizedException('유저가 존재하지 않습니다.');
        const isPassword = await bcrypt.compare(currentPassword, isUser.password);
        console.log('isPassword >> ', isPassword);
        if (!isPassword)
            throw new common_1.UnauthorizedException('비밀번호가 일치하지 않습니다.');
        const hashedPassword = await bcrypt.hash(password, 10);
        const passwordSaveResult = await this.userRepository.updatePasswordById(isUser._id, hashedPassword);
        console.log('passwordSaveResult >> ', passwordSaveResult);
        return true;
    }
    async jwtSignin(userSigninDto) {
        const { phoneNumber, password } = userSigninDto;
        const user = await this.userRepository.findUserByPhoneNumber(phoneNumber);
        if (!user) {
            throw new common_1.UnauthorizedException('휴대폰번호와 비밀번호를 확인해주세요.');
        }
        const isPassword = await bcrypt.compare(password, user.password);
        if (!isPassword) {
            throw new common_1.UnauthorizedException('휴대폰번호와 비밀번호를 확인해주세요.');
        }
        try {
            const jwt = await this.jwtService.signAsync({ sub: user._id }, { secret: process.env.JWT_SECRET });
            return { jwt, user };
        }
        catch (err) {
            throw new common_1.BadRequestException(err);
        }
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_repository_1.UserRepository,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map