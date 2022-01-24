import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './model/user.model';
import { Model } from 'mongoose';
import { UserRequestDto } from './dto/user.request.dto';

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User.name) private readonly user: Model<User>) {}

  // 중복 이메일인지 확인
  async existsByEmail(email: string): Promise<boolean> {
    const result = await this.user.exists({ email });
    return result;
  }

  // 유저 생성
  async createUser(userRequestDto: UserRequestDto): Promise<User> {
    return await this.user.create(userRequestDto);
  }

  // 이메일로 유저 찾기
  async findUserByEmail(email: string): Promise<User | null> {
    const user = await this.user.findOne({ email });
    return user;
  }

  // 비밀번호 없이 유저 아아디로 유저 찾기
  async findUserByIdWithoutPassword(userId: string): Promise<User | null> {
    const user = await this.user.findById(userId).select('-password');
    return user;
  }

  // 해당하는 아이디에 이미지 URI 업데이트
  async findByIdAndUpdateImg(
    userId: string,
    fileName: string,
  ): Promise<User | null> {
    const user = await this.user.findById(userId);
    user.profileURL = `http://localhost:8000/static/${fileName}`;
    const newUser = await user.save();
    console.log('newUser >> ', newUser);
    return newUser;
  }
}
