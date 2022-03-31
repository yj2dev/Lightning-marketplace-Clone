import { UserRepository } from '../../user/repository/user.repository';
declare const KakaoStrategy_base: new (...args: any[]) => any;
export declare class KakaoStrategy extends KakaoStrategy_base {
    private readonly userRepository;
    constructor(userRepository: UserRepository);
    validate(accessToken: string, refreshToken: string, profile: any, done: any): Promise<any>;
}
export {};
