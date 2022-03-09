import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Follow } from './model/follow.model';
import { Model } from 'mongoose';
import * as mongoose from 'mongoose';

@Injectable()
export class FollowReposigory {
  constructor(
    @InjectModel(Follow.name) private readonly follow: Model<Follow>,
  ) {}

  // 특정 유저가 팔로우 한 유저 불러오기
  async findById(fromUserId: string) {
    const result = await this.follow.findById({ fromUserId });
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
    const result = await this.follow.deleteOne({ toUserId, fromUserId });
    return result;
  }
}
