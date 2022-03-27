import { FollowService } from './follow.service';
import { Follow } from './model/follow.model';
export declare class FollowController {
    private readonly followService;
    constructor(followService: FollowService);
    isFollow(currentUser: any, userId: any): Promise<boolean>;
    getFollowing(userId: any): Promise<Follow[]>;
    getFollower(userId: any): Promise<Follow[]>;
}
