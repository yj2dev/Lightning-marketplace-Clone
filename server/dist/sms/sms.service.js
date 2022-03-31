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
exports.SmsService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("axios");
const CryptoJS = require("crypto-js");
const redis_cache_service_1 = require("../redis-cache/redis-cache.service");
const user_repository_1 = require("../user/repository/user.repository");
const success_interceptor_1 = require("../common/interceptor/success.interceptor");
const http_exception_filter_1 = require("../common/exception/http-exception.filter");
let SmsService = class SmsService {
    constructor(redisCacheService, userRepository) {
        this.redisCacheService = redisCacheService;
        this.userRepository = userRepository;
        this.NAVER_ACCESS_KEY = process.env.NAVER_ACCESS_KEY;
        this.NAVER_SECRET_KEY = process.env.NAVER_SECRET_KEY;
        this.NAVER_SERVICE_ID = process.env.NAVER_SERVICE_ID;
        this.NAVER_SMS_SEND_NUMBER = process.env.NAVER_SMS_SEND_NUMBER;
        this.logger = new common_1.Logger('SMS');
    }
    async showCache(key, value) {
        return await this.redisCacheService.setKey(key, value, 300);
    }
    async checkAuthenticationCode(phoneNumber, code) {
        const cacheValue = await this.redisCacheService.getKey(phoneNumber.toString());
        const isPhoneNumber = await this.userRepository.existsByPhoneNumber(phoneNumber);
        if (isPhoneNumber) {
            throw new common_1.UnauthorizedException('동일한 번호로 가입된 유저가 존재합니다.');
        }
        if (cacheValue && cacheValue === code) {
            return true;
        }
        else {
            return false;
        }
    }
    async sendAuthenticationCode(userPhoneNumber) {
        const host = 'https://sens.apigw.ntruss.com';
        const space = ' ';
        const newLine = '\n';
        const method = 'POST';
        const url = `/sms/v2/services/${this.NAVER_SERVICE_ID}/messages`;
        const timestamp = Date.now().toString();
        const accessKey = this.NAVER_ACCESS_KEY;
        const secretKey = this.NAVER_SECRET_KEY;
        const hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, secretKey);
        hmac.update(method);
        hmac.update(space);
        hmac.update(url);
        hmac.update(newLine);
        hmac.update(timestamp);
        hmac.update(newLine);
        hmac.update(accessKey);
        const hash = hmac.finalize();
        const signature = hash.toString(CryptoJS.enc.Base64);
        console.log('hash >> ', hash);
        console.log('signature >> ', signature);
        const random6Number = [0, 0, 0, 0, 0, 0];
        random6Number.forEach((v, i) => {
            random6Number[i] = Math.floor(Math.random() * 10);
        });
        console.log('random6Number >> ', random6Number);
        const stringRandom6Number = random6Number.join('');
        console.log('stringRandom6Number >> ', stringRandom6Number);
        const payload = {
            type: 'SMS',
            countryCode: '82',
            from: this.NAVER_SMS_SEND_NUMBER,
            content: `[벼락장터] 인증번호는 (${stringRandom6Number})입니다.`,
            messages: [
                {
                    to: userPhoneNumber,
                },
            ],
        };
        console.log('payload >> ', payload);
        const resultSendMessage = async () => {
            try {
                const res = await axios_1.default.post(`${host}${url}`, payload, {
                    headers: {
                        'Contenc-type': 'application/json; charset=utf-8',
                        'x-ncp-iam-access-key': this.NAVER_ACCESS_KEY,
                        'x-ncp-apigw-timestamp': timestamp,
                        'x-ncp-apigw-signature-v2': signature,
                    },
                });
                await this.redisCacheService.setKey(userPhoneNumber.toString(), stringRandom6Number, 300);
                return res;
            }
            catch (err) {
                throw new common_1.HttpException('인증문자 발송에 실패했습니다.', 500);
                console.log('resultSendMessage err >> ', err);
            }
        };
        const result = await resultSendMessage();
        console.log('result.data >> ', result.data);
        if (result.data.statusName === 'success')
            return true;
    }
};
SmsService = __decorate([
    (0, common_1.Injectable)(),
    (0, common_1.UseInterceptors)(success_interceptor_1.SuccessInterceptor),
    (0, common_1.UseFilters)(http_exception_filter_1.HttpExceptionFilter),
    __metadata("design:paramtypes", [redis_cache_service_1.RedisCacheService,
        user_repository_1.UserRepository])
], SmsService);
exports.SmsService = SmsService;
//# sourceMappingURL=sms.service.js.map