import { AuthService } from '../auth.service';
import { Strategy } from 'passport-naver-v2';
declare const NaverStrategy_base: new (...args: any[]) => Strategy;
export declare class NaverStrategy extends NaverStrategy_base {
    private readonly authService;
    constructor(authService: AuthService);
    validate(accessToken: string, refreshToken: string, profile: any, done: any): Promise<any>;
}
export {};
