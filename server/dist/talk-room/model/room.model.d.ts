import { Document, Types } from 'mongoose';
export declare class Room extends Document {
    toProductId: Types.ObjectId;
    lastContent: string;
    sellerId: Types.ObjectId;
    buyerId: Types.ObjectId;
}
export declare const RoomSchema: import("mongoose").Schema<Room, import("mongoose").Model<Room, any, any>, undefined, {}>;
