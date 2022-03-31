import { Document, Types } from 'mongoose';
export declare class Tag extends Document {
    name: string;
    toProductId: Types.ObjectId;
}
export declare const TagSchema: import("mongoose").Schema<Tag, import("mongoose").Model<Tag, any, any>, undefined, {}>;
