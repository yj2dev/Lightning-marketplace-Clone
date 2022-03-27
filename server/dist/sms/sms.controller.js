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
exports.SmsController = void 0;
const common_1 = require("@nestjs/common");
const sms_service_1 = require("./sms.service");
const success_interceptor_1 = require("../common/interceptor/success.interceptor");
const http_exception_filter_1 = require("../common/exception/http-exception.filter");
let SmsController = class SmsController {
    constructor(smsService) {
        this.smsService = smsService;
    }
    async sendAuthenticationCode(phoneNumber) {
        return await this.smsService.sendAuthenticationCode(phoneNumber);
    }
    async codeCheck(phoneNumber, code) {
        return await this.smsService.checkAuthenticationCode(phoneNumber, code);
    }
    async showCache(value, key) {
        return await this.smsService.showCache(value, key);
    }
};
__decorate([
    (0, common_1.Post)('/code/send'),
    __param(0, (0, common_1.Body)('phoneNumber')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], SmsController.prototype, "sendAuthenticationCode", null);
__decorate([
    (0, common_1.Post)('/code/check'),
    __param(0, (0, common_1.Body)('phoneNumber')),
    __param(1, (0, common_1.Body)('code')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], SmsController.prototype, "codeCheck", null);
__decorate([
    (0, common_1.Get)('/redis/test'),
    __param(0, (0, common_1.Query)('value')),
    __param(1, (0, common_1.Query)('key')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], SmsController.prototype, "showCache", null);
SmsController = __decorate([
    (0, common_1.Controller)('sms'),
    (0, common_1.UseInterceptors)(success_interceptor_1.SuccessInterceptor),
    (0, common_1.UseFilters)(http_exception_filter_1.HttpExceptionFilter),
    __metadata("design:paramtypes", [sms_service_1.SmsService])
], SmsController);
exports.SmsController = SmsController;
//# sourceMappingURL=sms.controller.js.map