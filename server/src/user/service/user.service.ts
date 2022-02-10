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

  async signOut() {
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
