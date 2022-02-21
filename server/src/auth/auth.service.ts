import {
  BadRequestException,
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserRepository } from '../user/repository/user.repository';
import { UserSigninDto } from './dto/user.signin.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  // 계정 확인(비밀번호 변경시 사용)
  // userId: 변경 대상, currentPassword: 현재 비밀번호, password: 변경할 비밀번호
  async jwtCheckAccount(
    userId: string,
    currentPassword: string,
    password: string,
  ) {
    console.log('userId >> ', userId);
    console.log('currentPassword >> ', currentPassword);
    console.log('password >> ', password);

    const isUser = await this.userRepository.findUserById(userId);
    console.log('isUser >> ', isUser);

    // 유저가 존재하지 않다면 오류 발생
    if (!isUser) throw new UnauthorizedException('유저가 존재하지 않습니다.');

    const isPassword: boolean = await bcrypt.compare(
      currentPassword,
      isUser.password,
    );

    console.log('isPassword >> ', isPassword);

    // 현재 비밀번호 확인
    if (!isPassword)
      throw new UnauthorizedException('비밀번호가 일치하지 않습니다.');

    // 변경할 비밀번호 암호화
    const hashedPassword = await bcrypt.hash(password, 10);

    // 비밀번호 저장
    const passwordSaveResult = await this.userRepository.updatePasswordById(
      isUser._id,
      hashedPassword,
    );

    console.log('passwordSaveResult >> ', passwordSaveResult);
    return true;
  }

  // 로그인
  async jwtSignin(userSigninDto: UserSigninDto) {
    const { phoneNumber, password } = userSigninDto;

    // 해당하는 휴대폰번호가 존재하는지 확인
    const user = await this.userRepository.findUserByPhoneNumber(phoneNumber);

    if (!user) {
      throw new UnauthorizedException('휴대폰번호와 비밀번호를 확인해주세요.');
    }

    // 비밀번호 또한 일치하는지 확인
    const isPassword: boolean = await bcrypt.compare(password, user.password);

    if (!isPassword) {
      throw new UnauthorizedException('휴대폰번호와 비밀번호를 확인해주세요.');
    }

    try {
      // sub: token의 제목
      const jwt = await this.jwtService.signAsync(
        { sub: user._id },
        { secret: process.env.JWT_SECRET },
      );
      return { jwt, user };
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
}
