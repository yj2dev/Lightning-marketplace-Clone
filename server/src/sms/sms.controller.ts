import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { SmsService } from './sms.service';

@Controller('sms')
export class SmsController {
  constructor(private smsService: SmsService) {}

  @Post('/code/send')
  async sendAuthenticationCode(@Body('phoneNumber') phoneNumber: number) {
    return await this.smsService.sendAuthenticationCode(phoneNumber);
  }

  @Post('/code/check')
  async codeCheck(
    @Body('phoneNumber') phoneNumber: number,
    @Body('code') code: string,
  ) {
    return await this.smsService.checkAuthenticationCode(phoneNumber, code);
  }

  @Get('/redis/test')
  async showCache(@Query('value') value: string, @Query('key') key: string) {
    return await this.smsService.showCache(value, key);
  }
}
