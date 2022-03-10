import { Injectable } from '@nestjs/common';
import { FollowRepository } from './follow.repository';
import mongoose from 'mongoose';

@Injectable()
export class FollowService {
  constructor(private readonly followReposigory: FollowRepository) {}

  async isFollow(toUserId: string, fromUserId: string): Promise<boolean> {
    const isFollow = await this.followReposigory.existFindById(
      toUserId,
      fromUserId,
    );

    // 팔로우 결과가 없을시 false, 있으면 true 반환
    return isFollow.length ? true : false;
  }

  async following(fromUserId: string) {
    const result = await this.followReposigory.following(fromUserId);
    return result;
  }

  // 팔로워: 특정 유저를 팔로워 하고 있는 유저 불러오기
  async follower(toUserId: string) {
    const result = await this.followReposigory.follower(toUserId);
    return result;
  }

  async followUser(toUserId: string, fromUserId: string) {
    //이미 팔로우한 유저인지 조회
    const isFollow = await this.followReposigory.existFindById(
      toUserId,
      fromUserId,
    );

    let result = null;
    if (isFollow.length === 0) {
      // 팔로우를 한 기록이 없다면 팔로우 생성
      console.log('팔로우 생성');
      result = await this.followReposigory.createFollow(toUserId, fromUserId);
      return true;
    } else {
      // 팔로우된 기록이 있다면 팔로우 해제
      console.log('팔로우 해제');
      result = await this.followReposigory.deleteFollow(toUserId, fromUserId);
    }
    console.log('follow result >> ', result);
    return false;
  }
}
