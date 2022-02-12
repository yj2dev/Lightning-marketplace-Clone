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
    const { phoneNumber, password } = loginRequestDto;

    // 해당하는 휴대폰번호가 존재하는지 확인
    const user = await this.userRepository.findUserByEmail(phoneNumber);

    if (!user) {
      throw new UnauthorizedException('전화번호와 비밀번호를 확인해주세요..');
    }

    // 비밀번호 또한 일치하는지 확인
    const isPassword: boolean = await bcrypt.compare(password, user.password);

    if (!isPassword) {
      throw new UnauthorizedException('전화번호와 비밀번호를 확인해주세요..');
    }

    // sub: token의 제목
    const payload = { storeName: user.storeName, sub: user._id };

    return {
      token: this.jwtService.sign(payload, { secret: process.env.JWT_SECRET }),
    };
  }
}
