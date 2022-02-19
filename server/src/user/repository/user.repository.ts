import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../model/user.model';
import { Model } from 'mongoose';
import { UserRequestDto } from '../dto/user.request.dto';
import { UserCreateDto } from '../dto/user.create.dto';
import { ProductSchema } from '../../product/model/product.model';
import * as mongoose from 'mongoose';

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User.name) private readonly user: Model<User>) {}

  // 유저 아이디로 필요한 모든 스키마 항목 병합(populate OR join)하기
  async findUserByIdAndPopulate(id: string): Promise<User | null> {
    const ProductModel = mongoose.model('products', ProductSchema);

    const result = await this.user
      .findById(id)
      .populate('products', ProductModel)
      .select('-password')
      .select('-phoneNumber');

    console.log('result populate >> ', result);

    return result;
  }

  // 해당하는 아이디의 닉네임(상점명) 컬럼(필드) 업데이트
  async updateStoreNameById(id: string, storeName: string): Promise<User> {
    const result = await this.user.findByIdAndUpdate(
      id,
      { storeName },
      { new: true },
    );
    console.log('updateStoreNameById result >> ', result);
    return result;
  }

  // 해당하는 아이디의 상점 소개글 컬럼(필드) 업데이트
  async updateDescriptionById(id: string, description: string): Promise<User> {
    const result = await this.user.findByIdAndUpdate(
      id,
      { description },
      { new: true },
    );
    console.log('updateStoreNameById result >> ', result);
    return result;
  }

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
    user.profileURL = `${process.env.MEDIA_URL}/user_profile/${fileName}`;
    const newUser = await user.save();
    console.log('newUser >> ', newUser);
    return newUser;
  }
}
