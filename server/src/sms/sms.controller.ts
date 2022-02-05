import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { SmsService } from './sms.service';

@Controller('sms')
export class SmsController {
  constructor(private smsService: SmsService) {}

  @Post('/code')
  async sendAuthenticationCode(@Body('phoneNumber') phoneNumber: number) {
    return await this.smsService.sendAuthenticationCode(phoneNumber);
  }

  @Get('/cache/show/:key')
  showCache(@Param('key') key) {
    return this.smsService.showCache(key);
  }
}
