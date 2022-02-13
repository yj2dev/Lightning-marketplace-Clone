import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Payload } from './jwt.payload';
import { UserRepository } from '../../user/repository/user.repository';
import { jwtExtractorFromCookies } from '../../common/utils/jwtExtractorFromCookies';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userRepository: UserRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([jwtExtractorFromCookies]),
      secretOrKey: process.env.JWT_SECRET,
      ignoreExpiration: false,
    });
  }

  async validate(payload: Payload) {
    console.log('validate payload >> ', payload);

    const user = await this.userRepository.findUserByIdWithoutPassword(
      payload.sub,
    );

    if (user) {
      return user;
    } else {
      throw new UnauthorizedException('접근 오류');
    }
  }
}
