/// <reference types="multer" />
import { UserRequestDto } from '../dto/user.request.dto';
import { User } from '../model/user.model';
import { UserRepository } from '../repository/user.repository';
export declare class UserService {
    private readonly userRepository;
    constructor(userRepository: UserRepository);
    private logger;
    deleteStoreReview(commentId: string): Promise<any>;
    getStoreReview(storeId: string): Promise<any>;
    createStoreReview(userId: string, storeId: string, content: string): Promise<any>;
    deleteStoreContact(commentId: string): Promise<any>;
    getStoreContact(storeId: string): Promise<any>;
    createStoreContact(userId: string, storeId: string, content: string): Promise<any>;
    deleteAccount(userId: string, phoneNumber: string, password: string): Promise<boolean>;
    getDetailUser(id: string): Promise<User>;
    updateStoreName(id: string, storeName: string): Promise<User>;
    updateDescription(id: string, description: string): Promise<User>;
    createStoreName(): Promise<string>;
    signup(userRequestDto: UserRequestDto): Promise<{
        storeName: string;
        profileURL: string;
    }>;
    isPhoneNumber(phoneNumber: string): Promise<User>;
    uploadImg(userId: string, file: Express.Multer.File): Promise<boolean>;
    resetImg(userId: string): Promise<boolean>;
}
