import { Document, Types } from 'mongoose';
export declare class StoreReview extends Document {
    toStoreId: Types.ObjectId;
    fromWriterId: Types.ObjectId;
    content: string;
}
export declare const StoreReviewSchema: import("mongoose").Schema<StoreReview, import("mongoose").Model<StoreReview, any, any>, undefined, {}>;
