import { Document, Types } from 'mongoose';
export declare class Talk extends Document {
    roomId: Types.ObjectId;
    toUserId: Types.ObjectId;
    fromUserId: Types.ObjectId;
    content: string;
    notRead: boolean;
}
export declare const TalkSchema: import("mongoose").Schema<Talk, import("mongoose").Model<Talk, any, any>, undefined, {}>;
