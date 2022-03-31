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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = require("bcrypt");
const user_repository_1 = require("../repository/user.repository");
let UserService = class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
        this.logger = new common_1.Logger('user');
    }
    async deleteStoreReview(commentId) {
        return await this.userRepository.deleteStoreReview(commentId);
    }
    async getStoreReview(storeId) {
        return await this.userRepository.getStoreReviewAll(storeId);
    }
    async createStoreReview(userId, storeId, content) {
        return await this.userRepository.createStoreReview(userId, storeId, content);
    }
    async deleteStoreContact(commentId) {
        return await this.userRepository.deleteStoreContact(commentId);
    }
    async getStoreContact(storeId) {
        return await this.userRepository.getStoreContactAll(storeId);
    }
    async createStoreContact(userId, storeId, content) {
        return await this.userRepository.createStoreContact(userId, storeId, content);
    }
    async deleteAccount(userId, phoneNumber, password) {
        const isUser = await this.userRepository.findUserById(userId);
        console.log('isUser >> ', isUser);
        if (!isUser)
            throw new common_1.UnauthorizedException('유저가 존재하지 않습니다.');
        console.log(isUser.phoneNumber === phoneNumber);
        console.log(typeof isUser.phoneNumber, typeof phoneNumber);
        if (isUser.phoneNumber !== phoneNumber)
            throw new common_1.UnauthorizedException('현재 사용자와 휴대번호가 일치하지 않습니다.');
        const isPassword = await bcrypt.compare(password, isUser.password);
        console.log('isPassword >> ', isPassword);
        if (!isPassword)
            throw new common_1.UnauthorizedException('비밀번호가 일치하지 않습니다.');
        const deleteAccountResult = await this.userRepository.deleteUser(isUser._id);
        console.log('deleteAccountResult >> ', deleteAccountResult);
        if (!deleteAccountResult)
            throw new common_1.UnauthorizedException('회원탈퇴에 실패했습니다.');
        return true;
    }
    async getDetailUser(id) {
        const isUser = await this.userRepository.findUserByIdAndPopulate(id);
        return isUser;
    }
    async updateStoreName(id, storeName) {
        const isStoreName = await this.userRepository.existsByStoreName(storeName);
        console.log('isStoreName >> ', isStoreName);
        if (isStoreName)
            throw new common_1.HttpException('동일한 상점명이 등록되어 있습니다.', 409);
        return await this.userRepository.updateStoreNameById(id, storeName);
    }
    async updateDescription(id, description) {
        return this.userRepository.updateDescriptionById(id, description);
    }
    async createStoreName() {
        let storeName;
        while (true) {
            let random8Number = '';
            for (let i = 0; i < 8; i++) {
                const random = Math.floor(Math.random() * 10);
                random8Number = random8Number + random;
            }
            storeName = `상점${random8Number}호`;
            const isStoreName = await this.userRepository.existsByStoreName(storeName);
            console.log('storeName >> ', storeName);
            console.log('isStoreName >> ', isStoreName);
            if (!isStoreName)
                break;
            else
                this.logger.log('기본 상점명 재생성');
        }
        return storeName;
    }
    async signup(userRequestDto) {
        console.log('userRequestDto >> ', userRequestDto);
        const isPhoneNumber = await this.userRepository.existsByPhoneNumber(userRequestDto.phoneNumber);
        if (isPhoneNumber) {
            throw new common_1.UnauthorizedException('동일한 번호로 가입된 유저가 존재합니다.');
        }
        const storeName = await this.createStoreName();
        console.log('return storeName >> ', storeName);
        const hashedPassword = await bcrypt.hash(userRequestDto.password, 10);
        console.log('hashedPassword >> ', hashedPassword);
        const user = await this.userRepository.createUser({
            phoneNumber: userRequestDto.phoneNumber,
            password: hashedPassword,
            storeName,
        });
        console.log('user >> ', user);
        return user.readonlyData;
    }
    async isPhoneNumber(phoneNumber) {
        const isUser = await this.userRepository.findUserByPhoneNumber(phoneNumber);
        return isUser;
    }
    async uploadImg(userId, file) {
        const imgSaveResult = await this.userRepository.findByIdAndUpdateImg(userId, file);
        console.log('imgSaveResult >> ', imgSaveResult);
        return true;
    }
    async resetImg(userId) {
        const imgResetResult = await this.userRepository.findByIdAndResetImg(userId);
        console.log('imgResetResult >> ', imgResetResult);
        return true;
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_repository_1.UserRepository])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map