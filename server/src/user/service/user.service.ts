import {
  HttpException,
  Injectable,
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

  async signUp(userRequestDto: UserRequestDto) {
    const { name, phoneNumber } = userRequestDto;
    const isPhoneNumberExist: boolean = await this.userRepository.existsByEmail(
      phoneNumber,
    );

    if (isPhoneNumberExist) {
      throw new UnauthorizedException(
        '인증된 휴대폰 번호는 이미 가입이 완료되었습니다.',
      );
    }

    const newUser = await this.userRepository.createUser({
      name,
      phoneNumber,
    });

    return newUser.readonlyData;
  }

  async signOut() {
    return 'signOut: The client processes it';
  }

  async uploadImg(user: User, files: Express.Multer.File[]) {
    const fileName = `user.profile/${files[0].filename}`;

    console.log(fileName);
    const newUser = await this.userRepository.findByIdAndUpdateImg(
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
