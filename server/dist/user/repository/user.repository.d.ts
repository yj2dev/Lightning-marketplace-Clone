/// <reference types="multer" />
import { User } from '../model/user.model';
import { Model } from 'mongoose';
import { UserCreateDto } from '../dto/user.create.dto';
import { StoreContact } from '../../store-contact/model/store-contact.model';
import { StoreReview } from '../../store-review/model/store-review.model';
export declare class UserRepository {
    private readonly user;
    private readonly storeContact;
    private readonly storeReview;
    constructor(user: Model<User>, storeContact: Model<StoreContact>, storeReview: Model<StoreReview>);
    deleteStoreReview(commentId: string): Promise<any>;
    getStoreReviewAll(storeId: string): Promise<any>;
    createStoreReview(userId: string, storeId: string, content: string): Promise<any>;
    deleteStoreContact(commentId: string): Promise<any>;
    getStoreContactAll(storeId: string): Promise<any>;
    createStoreContact(userId: string, storeId: string, content: string): Promise<any>;
    deleteUser(id: string): Promise<{
        ok?: number;
        n?: number;
    } & {
        deletedCount?: number;
    }>;
    findUserByIdAndPopulate(id: string): Promise<User | null>;
    updateStoreNameById(id: string, storeName: string): Promise<User>;
    updateDescriptionById(id: string, description: string): Promise<User>;
    updatePasswordById(id: string, password: string): Promise<User | null>;
    existsByPhoneNumber(phoneNumber: string): Promise<boolean>;
    existsByStoreName(storeName: string): Promise<boolean>;
    createUser(userCreateDto: UserCreateDto): Promise<User>;
    findUserByPhoneNumber(phoneNumber: string): Promise<User | null>;
    findUserByIdWithoutPasswordAndPhoneNumber(userId: string): Promise<User | null>;
    findUserById(userId: string): Promise<User | null>;
    findByIdAndUpdateImg(userId: string, file: Express.Multer.File): Promise<User | null>;
    findByIdAndResetImg(userId: string): Promise<User>;
}
