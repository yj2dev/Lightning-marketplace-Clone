import { Logger } from '@nestjs/common';
import { RedisCacheService } from '../redis-cache/redis-cache.service';
import { UserRepository } from '../user/repository/user.repository';
export declare class SmsService {
    private readonly redisCacheService;
    private readonly userRepository;
    constructor(redisCacheService: RedisCacheService, userRepository: UserRepository);
    private readonly NAVER_ACCESS_KEY;
    private readonly NAVER_SECRET_KEY;
    private readonly NAVER_SERVICE_ID;
    private readonly NAVER_SMS_SEND_NUMBER;
    logger: Logger;
    showCache(key: string, value: string): Promise<boolean>;
    checkAuthenticationCode(phoneNumber: string, code: string): Promise<boolean>;
    sendAuthenticationCode(userPhoneNumber: number): Promise<boolean>;
}
