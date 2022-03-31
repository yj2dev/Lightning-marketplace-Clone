"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisCacheModule = exports.cacheModule = void 0;
const common_1 = require("@nestjs/common");
const redis_cache_service_1 = require("./redis-cache.service");
const redisStore = require("cache-manager-redis-store");
exports.cacheModule = common_1.CacheModule.registerAsync({
    useFactory: async () => ({
        store: redisStore,
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
        ttl: 0,
        auth_pass: process.env.REDIS_PASSWORD,
    }),
});
let RedisCacheModule = class RedisCacheModule {
};
RedisCacheModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [exports.cacheModule],
        providers: [redis_cache_service_1.RedisCacheService],
        exports: [redis_cache_service_1.RedisCacheService],
    })
], RedisCacheModule);
exports.RedisCacheModule = RedisCacheModule;
//# sourceMappingURL=redis-cache.module.js.map