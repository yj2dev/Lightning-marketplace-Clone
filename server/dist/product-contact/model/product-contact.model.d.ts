import { Document, Types } from 'mongoose';
export declare class ProductContact extends Document {
    toStoreId: Types.ObjectId;
    fromWriterId: Types.ObjectId;
    content: string;
}
export declare const ProductContactSchema: import("mongoose").Schema<ProductContact, import("mongoose").Model<ProductContact, any, any>, undefined, {}>;
