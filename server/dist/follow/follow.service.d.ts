import { FollowRepository } from './follow.repository';
export declare class FollowService {
    private readonly followReposigory;
    constructor(followReposigory: FollowRepository);
    isFollow(toUserId: string, fromUserId: string): Promise<boolean>;
    following(fromUserId: string): Promise<import("./model/follow.model").Follow[]>;
    follower(toUserId: string): Promise<import("./model/follow.model").Follow[]>;
    followUser(toUserId: string, fromUserId: string): Promise<boolean>;
}
