import { Document, Types } from 'mongoose';
export declare class ProductFavorite extends Document {
    toStoreId: Types.ObjectId;
    fromProductId: Types.ObjectId;
}
export declare const ProductFavoriteSchema: import("mongoose").Schema<ProductFavorite, import("mongoose").Model<ProductFavorite, any, any>, undefined, {}>;
