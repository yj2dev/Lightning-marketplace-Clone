import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class RedisCacheService {
  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}

  async setKey(key: string, value: string): Promise<boolean> {
    return await this.cacheManager.set(key, value, 10);
  }

  async getKey(key: string): Promise<string> {
    const value = (await this.cacheManager.get(key)) as string;
    console.log('redis value >> ', value);
    // return value;

    return await this.cacheManager.get(key);
  }
}
