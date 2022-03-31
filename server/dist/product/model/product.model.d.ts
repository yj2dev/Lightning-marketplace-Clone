import { Document, Types } from 'mongoose';
export declare class Product extends Document {
    state: string;
    userId: Types.ObjectId;
    thumbnailImgURL: string;
    productImgURL: Types.ObjectId;
    title: string;
    newProduct: boolean;
    enableExchange: boolean;
    price: number;
    containDeliveryCharge: boolean;
    description: string;
    address: string;
    tag: Types.ObjectId;
    quantity: number;
    largeCateogry: string;
    mediumCategory: string;
    smallCategory: string;
}
export declare const ProductSchema: import("mongoose").Schema<Product, import("mongoose").Model<Product, any, any>, undefined, {}>;
