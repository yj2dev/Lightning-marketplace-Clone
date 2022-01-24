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
import { UserRepository } from '../user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async signUp(userRequestDto: UserRequestDto) {
    const { name, email, password } = userRequestDto;
    const isEmailExist: boolean = await this.userRepository.existsByEmail(
      email,
    );

    if (isEmailExist) {
      throw new UnauthorizedException('입력된 이메일은 이미 존재합니다.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await this.userRepository.createUser({
      name,
      email,
      password: hashedPassword,
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
}
