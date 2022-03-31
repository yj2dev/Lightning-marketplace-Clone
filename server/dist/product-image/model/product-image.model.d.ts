import { Document, Types } from 'mongoose';
export declare class ProductImage extends Document {
    productId: Types.ObjectId;
    productImgURL: string;
}
export declare const ProductImageSchema: import("mongoose").Schema<ProductImage, import("mongoose").Model<ProductImage, any, any>, undefined, {}>;
