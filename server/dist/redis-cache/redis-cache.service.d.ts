import { Cache } from 'cache-manager';
export declare class RedisCacheService {
    private readonly cacheManager;
    constructor(cacheManager: Cache);
    setKey(key: string, value: string, ttl: number): Promise<boolean>;
    getKey(key: string): Promise<string>;
    delKey(key: string): Promise<boolean>;
}
