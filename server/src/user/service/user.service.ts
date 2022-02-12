import {
  HttpException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { UserRequestDto } from '../dto/user.request.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../model/user.model';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { UserRepository } from '../repository/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  private logger = new Logger('user');

  // 상점명 무작위 생성
  async createStoreName(): Promise<string> {
    let storeName;
    while (true) {
      // 랜덤 8자리 생성(0 ~ 99999999)
      let random8Number = '';
      for (let i = 0; i < 8; i++) {
        const random = Math.floor(Math.random() * 10);
        random8Number = random8Number + random;
      }

      storeName = `상점${random8Number}호`;

      // 중복된 상점명이 있는지 확인
      const isStoreName = await this.userRepository.existsByStoreName(
        storeName,
      );

      console.log('storeName >> ', storeName);
      console.log('isStoreName >> ', isStoreName);

      // 중복된 상점명이 없으면 진행
      if (!isStoreName) break;
      else this.logger.log('기본 상점명 재생성');
    }
    return storeName;
  }

  async signup(userRequestDto: UserRequestDto) {
    console.log('userRequestDto >> ', userRequestDto);

    // 돋일한 번호로 가입된 유저가 있는지 확인
    const isPhoneNumber = await this.userRepository.existsByPhoneNumber(
      userRequestDto.phoneNumber,
    );

    // 가입된 유저가 있으면 에러 반환
    if (isPhoneNumber) {
      throw new UnauthorizedException(
        '동일한 번호로 가입된 유저가 존재합니다.',
      );
    }

    /* 유저 저장 */
    // 신규 상점명 생성
    const storeName = await this.createStoreName();

    // 비밀번호 암호화
    const hashedPassword = await bcrypt.hash(userRequestDto.password, 10);

    const user = await this.userRepository.createUser({
      phoneNumber: userRequestDto.phoneNumber,
      password: hashedPassword,
      storeName,
    });

    return user.readonlyData;
  }

  async isPhoneNumber(phoneNumber: string) {
    const isUser = await this.userRepository.findUserByPhoneNumber(phoneNumber);
    // if (!isUser) {
    //   throw new HttpException('유저가 존재하지 않습니다.', 409);
    // }
    return isUser;
  }

  async signout() {
    return 'signOut: The client processes it';
  }

  async uploadImg(user: User, files: Express.Multer.File[]) {
    const fileName = `user.profile/${files[0].filename}`;
    // example URL: http://localhost:8000/static/user.profile/ad061644514995652.png

    console.log(fileName);
    const newUser = await this.userRepository.findByIdAndUpdateImg1(
      user.id,
      fileName,
    );
    console.log(newUser);
    return newUser.readonlyData;
  }

  async uploadImgNoUser(files: Express.Multer.File[]) {
    const fileName = `user.profile/${files[0].filename}`;

    return fileName;
  }
}
