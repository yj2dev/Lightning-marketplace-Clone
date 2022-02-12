import {
  CACHE_MANAGER,
  Get,
  HttpException,
  Inject,
  Injectable,
  Logger,
  Param,
  UnauthorizedException,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import axios from 'axios';
import * as CryptoJS from 'crypto-js';
import { RedisCacheService } from '../redis-cache/redis-cache.service';
import { UserRepository } from '../user/repository/user.repository';
import { SuccessInterceptor } from '../common/interceptor/success.interceptor';
import { HttpExceptionFilter } from '../common/exception/http-exception.filter';

@Injectable()
@UseInterceptors(SuccessInterceptor)
@UseFilters(HttpExceptionFilter)
export class SmsService {
  constructor(
    private readonly redisCacheService: RedisCacheService,
    private readonly userRepository: UserRepository,
  ) {}
  private readonly NAVER_ACCESS_KEY = process.env.NAVER_ACCESS_KEY;
  private readonly NAVER_SECRET_KEY = process.env.NAVER_SECRET_KEY;
  private readonly NAVER_SERVICE_ID = process.env.NAVER_SERVICE_ID;
  private readonly NAVER_SMS_SEND_NUMBER = process.env.NAVER_SMS_SEND_NUMBER;

  logger = new Logger('SMS');

  async showCache(key: string, value: string) {
    return await this.redisCacheService.setKey(key, value, 300);
  }

  // 휴대폰 인증번호 확인
  async checkAuthenticationCode(
    phoneNumber: string,
    code: string,
  ): Promise<boolean> {
    const cacheValue = await this.redisCacheService.getKey(
      phoneNumber.toString(),
    );
    // 가입된 유저인지 확인 (앞에서 확인했지만 한번더 확인)
    const isPhoneNumber = await this.userRepository.existsByPhoneNumber(
      phoneNumber,
    );

    // 가입이 되어 있다면 결과 반환
    if (isPhoneNumber) {
      throw new UnauthorizedException(
        '동일한 번호로 가입된 유저가 존재합니다.',
      );
    }

    // 인증번호 값이 유저가 입력한 인증번호와 일치할때
    if (cacheValue && cacheValue === code) {
      return true;
    } else {
      // 캐시메모리에 휴대번호가 없거나 휴대번호의 코드가 일치하지 않을 때
      return false;
    }
  }

  async sendAuthenticationCode(userPhoneNumber: number) {
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
        const res = await axios.post(`${host}${url}`, payload, {
          headers: {
            'Contenc-type': 'application/json; charset=utf-8',
            'x-ncp-iam-access-key': this.NAVER_ACCESS_KEY,
            'x-ncp-apigw-timestamp': timestamp,
            'x-ncp-apigw-signature-v2': signature,
          },
        });

        // 레디스 캐시메모리에 3분간 저장
        await this.redisCacheService.setKey(
          userPhoneNumber.toString(),
          stringRandom6Number,
          300,
        );

        return res;
      } catch (err) {
        throw new HttpException('인증문자 발송에 실패했습니다.', 500);
        console.log('resultSendMessage err >> ', err);
      }
    };

    const result = await resultSendMessage();
    console.log('result.data >> ', result.data);

    if (result.data.statusName === 'success') return true;
  }
}
