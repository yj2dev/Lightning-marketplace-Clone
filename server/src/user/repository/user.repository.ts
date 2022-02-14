import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../model/user.model';
import { Model } from 'mongoose';
import { UserRequestDto } from '../dto/user.request.dto';
import { UserCreateDto } from '../dto/user.create.dto';

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User.name) private readonly user: Model<User>) {}

  // 중복된 휴대번호인지 확인
  async existsByPhoneNumber(phoneNumber: string): Promise<boolean> {
    const result = await this.user.exists({ phoneNumber });
    return result;
  }

  // 중복된 상점명인지 확인
  async existsByStoreName(storeName: string): Promise<boolean> {
    const result = await this.user.exists({ storeName });
    return result;
  }

  // 유저 생성
  async createUser(userCreateDto: UserCreateDto): Promise<User> {
    return await this.user.create(userCreateDto);
  }

  // 휴대번호로 유저 찾기
  async findUserByPhoneNumber(phoneNumber: string): Promise<User | null> {
    const user = await this.user.findOne({ phoneNumber });
    return user;
  }

  //------------- [ 사용안함 ] -----------------------------------
  // 중복 이메일인지 확인
  async existsByEmail(email: string): Promise<boolean> {
    const result = await this.user.exists({ email });
    return result;
  }

  // 유저 생성
  async createUser1(userRequestDto: UserRequestDto): Promise<User> {
    return await this.user.create(userRequestDto);
  }

  // 이메일로 유저 찾기
  async findUserByEmail(email: string): Promise<User | null> {
    const user = await this.user.findOne({ email });
    return user;
  }

  // 유저 아이디로 유저찾기 (비밀번호, 휴대번호 제외)
  async findUserByIdWithoutPasswordAndPhoneNumber(
    userId: string,
  ): Promise<User | null> {
    const user = await this.user
      .findById(userId)
      .select('-password')
      .select('-phoneNumber');
    return user;
  }

  // 해당하는 아이디에 이미지 URI 업데이트
  async findByIdAndUpdateImg1(
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
