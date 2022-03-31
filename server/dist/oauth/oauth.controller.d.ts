export declare class OauthController {
    private readonly KAKAO_REST_API_KEY;
    private readonly KAKAO_REDIRECT_URI;
    private readonly KAKAO_CLIENT_SECRET;
    private readonly NAVER_CLIENT_ID;
    private readonly NAVER_CLIENT_SECRET;
    private readonly NAVER_REDIRECT_URI;
    naverlogin(): void;
    naverLoginCallback(req: any): Promise<any>;
    kakaoLogin(): Promise<void>;
    kakaoLoginCallback(req: any): Promise<any>;
    testGet(code: string): Promise<any>;
    createCache23(): string;
    createCache233(): string;
    createCache(): string;
    showCache(key: any): string;
    deleteCache(): string;
}
