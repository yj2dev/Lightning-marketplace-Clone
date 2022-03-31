import { Document, Types } from 'mongoose';
export declare class Follow extends Document {
    fromUserId: Types.ObjectId;
    toUserId: Types.ObjectId;
}
export declare const FollowSchema: import("mongoose").Schema<Follow, import("mongoose").Model<Follow, any, any>, undefined, {}>;
