import { SmsService } from './sms.service';
export declare class SmsController {
    private smsService;
    constructor(smsService: SmsService);
    sendAuthenticationCode(phoneNumber: number): Promise<boolean>;
    codeCheck(phoneNumber: string, code: string): Promise<boolean>;
    showCache(value: string, key: string): Promise<boolean>;
}
