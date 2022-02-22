import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { UserRepository } from '../../user/repository/user.repository';
import { Strategy } from 'passport-kakao';

@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userRepository: UserRepository) {
    super({
      clientID: process.env.KAKAO_AUTH_REST_API_KEY,
      clientSecret: process.env.KAKAO_AUTH_CLIENT_SECRET,
      callbackURL: process.env.KAKAO_AUTH_REDIRECT_URI,
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: any,
  ): Promise<any> {
    console.log('[ Kakao validate ]');
    console.log('accessToken >> ', accessToken);
    console.log('refreshToken >> ', refreshToken);
    console.log('profile >> ', profile);
    console.log('done >> ', done);

    return done(null, 'kakao succeed');
  }
}
