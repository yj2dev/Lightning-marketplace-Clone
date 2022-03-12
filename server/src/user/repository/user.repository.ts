import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserSchema } from '../model/user.model';
import { Model } from 'mongoose';
import { UserCreateDto } from '../dto/user.create.dto';
import { ProductSchema } from '../../product/model/product.model';
import * as mongoose from 'mongoose';
import { StoreContact } from '../../store-contact/model/store-contact.model';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User.name) private readonly user: Model<User>,
    @InjectModel(StoreContact.name)
    private readonly storeContact: Model<StoreContact>,
  ) {}

  // 상점 문의 제거
  async deleteStoreContact(commentId: string): Promise<any> {
    const result = await this.storeContact.findByIdAndDelete(commentId);
    return result;
  }

  // 상점문의 내용 불러오기
  async getStoreContactAll(storeId: string): Promise<any> {
    const UserModel = mongoose.model('users', UserSchema);

    console.log('storeId >> ', storeId);

    const result = await this.storeContact
      .find({ toStoreId: mongoose.Types.ObjectId(storeId) })
      .sort({ createdAt: -1 })
      .populate('_fromWriterId', UserModel);

    console.log('result contact >> ', result);

    return result;
  }

  // 상점 문의 작성
  async createStoreContact(
    userId: string,
    storeId: string,
    content: string,
  ): Promise<any> {
    const result = await this.storeContact.create({
      toStoreId: mongoose.Types.ObjectId(storeId),
      fromWriterId: mongoose.Types.ObjectId(userId),
      content,
    });
    return result;
  }

  // 유저 제거(게시물은 남겨두고 유저만 회원탈퇴 진행)
  async deleteUser(id: string) {
    const result = await this.user.deleteOne({ _id: id });
    return result;
  }

  // 유저 아이디로 필요한 모든 스키마 항목 병합(populate == join)하기
  async findUserByIdAndPopulate(id: string): Promise<User | null> {
    const ProductModel = mongoose.model('products', ProductSchema);

    const result = await this.user
      .findById(id)
      .populate('products', ProductModel)
      .select('-password')
      .select('-phoneNumber');

    // console.log('result populate >> ', result);

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

  // 해당하는 아이디의 비밀번호 업데이트
  async updatePasswordById(id: string, password: string): Promise<User | null> {
    const result = await this.user.findByIdAndUpdate(
      id,
      { password },
      { new: true },
    );

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

  // 유저 아이디로 유저찾기
  async findUserById(userId: string): Promise<User | null> {
    const user = await this.user.findById(userId);
    return user;
  }

  // 해당하는 아이디에 이미지 URI 업데이트
  async findByIdAndUpdateImg(
    userId: string,
    file: Express.Multer.File,
  ): Promise<User | null> {
    const user = await this.user.findById(userId);
    user.profileURL = `${process.env.MEDIA_URL}/static/user_profile/${file[0].filename}`;
    const result = await user.save();
    return result;
  }

  async findByIdAndResetImg(userId: string) {
    const user = await this.user.findById({ _id: userId });
    user.profileURL = `${process.env.MEDIA_URL}/static/user_profile/__default_store_profile__.png`;
    const result = await user.save();
    return result;
  }
}
