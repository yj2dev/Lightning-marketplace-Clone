import { Document } from 'mongoose';
export declare class User extends Document {
    phoneNumber: string;
    password: string;
    storeName: string;
    description: string;
    profileURL: string;
    product: string;
    kakaoId: string;
    facebookId: string;
    naverId: string;
    readonly readonlyData: {
        storeName: string;
        profileURL: string;
    };
}
export declare const UserSchema: import("mongoose").Schema<User, import("mongoose").Model<User, any, any>, undefined, {}>;
