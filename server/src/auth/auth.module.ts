import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt/jwt.strategy';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from '../user/user.module';
import { NaverStrategy } from './jwt/naver.strategy';
import { KakaoStrategy } from './jwt/kakao.strategy';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PassportModule.register({ defaultStrategy: 'jwt', session: false }),

    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1y' },
    }),

    forwardRef(() => UserModule),
  ],
  providers: [AuthService, JwtStrategy, NaverStrategy, KakaoStrategy],
  exports: [AuthService],
})
export class AuthModule {}
