import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class RedisCacheService {
  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}

  async setKey(key: string, value: string, ttl: number): Promise<boolean> {
    await this.cacheManager.set(key, value, { ttl });
    return true;
  }

  async getKey(key: string): Promise<string> {
    const value = await this.cacheManager.get(key);
    console.log('redis value >> ', value);
    return value;
  }

  async delKey(key: string): Promise<boolean> {
    await this.cacheManager.del(key);
    return true;
  }
}
