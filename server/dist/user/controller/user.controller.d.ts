import { Response } from 'express';
import { UserService } from '../service/user.service';
import { UserRequestDto } from '../dto/user.request.dto';
import { AuthService } from '../../auth/auth.service';
import { UserSigninDto } from '../../auth/dto/user.signin.dto';
import { User } from '../model/user.model';
import { FollowService } from '../../follow/follow.service';
export declare class UserController {
    private readonly userService;
    private readonly authService;
    private readonly followService;
    constructor(userService: UserService, authService: AuthService, followService: FollowService);
    deleteProductReview(commentId: string, currentUser: User): Promise<any>;
    getProductReview(storeId: string): Promise<any>;
    createProductReview(storeId: string, content: string, currentUser: User): Promise<any>;
    deleteProductContact(commentId: string, currentUser: User): Promise<any>;
    getProductContact(storeId: string): Promise<any>;
    createProductContact(storeId: string, content: string, currentUser: User): Promise<any>;
    createFollow(currentUser: any, toUserId: string): Promise<any>;
    deleteAccount(currentUser: any, phoneNumber: string, password: string): Promise<boolean>;
    updatePassword(currentUser: any, currentPassword: string, password: string, res: Response): Promise<any>;
    getDetailUser(userId: string): Promise<User>;
    updateDescription(currentUser: any, description: string): Promise<User>;
    updateNickname(currentUser: any, storeName: string): Promise<User>;
    authUser(currentUser: any): Promise<any>;
    signUp(userRequestDto: UserRequestDto): Promise<{
        storeName: string;
        profileURL: string;
    }>;
    signin(userSigninDto: UserSigninDto, res: Response): Promise<{
        storeName: string;
        profileURL: string;
    }>;
    signout(res: Response): Promise<void>;
    isUser(phoneNumber: string): Promise<User>;
    uploadProfileImg(currentUser: User, file: any): Promise<boolean>;
    resetProfileImg(currentUser: User): Promise<boolean>;
}
