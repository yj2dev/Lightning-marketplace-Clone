import { Document, Types } from 'mongoose';
export declare class StoreContact extends Document {
    toStoreId: Types.ObjectId;
    fromWriterId: Types.ObjectId;
    content: string;
}
export declare const StoreContactSchema: import("mongoose").Schema<StoreContact, import("mongoose").Model<StoreContact, any, any>, undefined, {}>;
