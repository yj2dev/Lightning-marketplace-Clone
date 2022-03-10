import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Follow } from './model/follow.model';
import { Model } from 'mongoose';
import * as mongoose from 'mongoose';
import { User, UserSchema } from '../user/model/user.model';

@Injectable()
export class FollowRepository {
  constructor(
    @InjectModel(Follow.name) private readonly follow: Model<Follow>,
    @InjectModel(User.name) private readonly user: Model<User>,
  ) {}

  // 팔로잉: 특정 유저가 팔로우 한 유저 불러오기
  async following(fromUserId: string) {
    const userModel = mongoose.model('users', UserSchema);

    const result = await this.follow
      .find({
        fromUserId: mongoose.Types.ObjectId(fromUserId),
      })
      .populate('_toUserId', userModel);
    return result;
  }

  // 팔로워: 특정 유저를 팔로워 하고 있는 유저 불러오기
  async follower(toUserId: string) {
    const userModel = mongoose.model('users', UserSchema);

    const result = await this.follow
      .find({
        toUserId: mongoose.Types.ObjectId(toUserId),
      })
      .populate('_fromUserId', userModel);
    return result;
  }

  // 팔로우 여부 조회(중복 생성을 방지)

  async existFindById(toUserId: string, fromUserId: string): Promise<Follow[]> {
    const result = await this.follow.find({
      toUserId: mongoose.Types.ObjectId(toUserId),
      fromUserId: mongoose.Types.ObjectId(fromUserId),
    });
    return result;
  }

  // 팔로우 정보 저장
  async createFollow(toUserId: string, fromUserId: string) {
    const result = await this.follow.create({
      toUserId: mongoose.Types.ObjectId(toUserId),
      fromUserId: mongoose.Types.ObjectId(fromUserId),
    });
    return result;
  }

  // 팔로우 정보 제거
  async deleteFollow(toUserId: string, fromUserId: string) {
    const result = await this.follow.deleteOne({
      toUserId: mongoose.Types.ObjectId(toUserId),
      fromUserId: mongoose.Types.ObjectId(fromUserId),
    });
    return result;
  }
}
