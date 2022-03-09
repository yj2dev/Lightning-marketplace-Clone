import { Injectable } from '@nestjs/common';
import { FollowReposigory } from './follow.reposigory';

@Injectable()
export class FollowService {
  constructor(private readonly followReposigory: FollowReposigory) {}

  // 특정 유저가 팔로우 한 유저 불러오기
  async findById(fromUserId: string) {
    return await this.followReposigory.findById(fromUserId);
  }

  // 팔로우 정보 저장
  async createFollow(toUserId: string, fromUserId: string) {
    return await this.createFollow(toUserId, fromUserId);
  }

  // 팔로우 정보 제거
  async deleteFollow(toUserId: string, fromUserId: string) {
    return await this.deleteFollow(toUserId, fromUserId);
  }
}
