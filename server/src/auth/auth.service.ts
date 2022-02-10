import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from '../user/repository/user.repository';
import { LoginRequestDto } from './dto/login.request.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async jwtLogin(loginRequestDto: LoginRequestDto) {
    const { name, phoneNumber } = loginRequestDto;

    const user = await this.userRepository.findUserByEmail(phoneNumber);

    if (!user) {
      throw new UnauthorizedException('전화번호와 일치하는 유저가 없습니다.');
    }

    const payload = { storeName: user.storeName, sub: user._id };

    return {
      token: this.jwtService.sign(payload, { secret: process.env.JWT_SECRET }),
    };
  }
}
