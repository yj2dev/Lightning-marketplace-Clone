import { Follow } from './model/follow.model';
import { Model } from 'mongoose';
import { User } from '../user/model/user.model';
export declare class FollowRepository {
    private readonly follow;
    private readonly user;
    constructor(follow: Model<Follow>, user: Model<User>);
    following(fromUserId: string): Promise<Follow[]>;
    follower(toUserId: string): Promise<Follow[]>;
    existFindById(toUserId: string, fromUserId: string): Promise<Follow[]>;
    createFollow(toUserId: string, fromUserId: string): Promise<Follow>;
    deleteFollow(toUserId: string, fromUserId: string): Promise<{
        ok?: number;
        n?: number;
    } & {
        deletedCount?: number;
    }>;
}
