import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from '../auth.service';
import { Strategy } from 'passport-naver-v2';

@Injectable()
export class NaverStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      clientID: process.env.NAVER_AUTH_CLIENT_ID,
      clientSecret: process.env.NAVER_AUTH_CLIENT_SECRET,
      callbackURL: process.env.NAVER_AUTH_REDIRECT_URI,
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: any,
  ): Promise<any> {
    console.log('[ Naver validate ]');
    console.log('accessToken >> ', accessToken);
    console.log('refreshToken >> ', refreshToken);
    console.log('profile >> ', profile);
    console.log('done >> ', done);
  }
}
