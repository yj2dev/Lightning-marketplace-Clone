import { Controller, Get, Param } from '@nestjs/common';

@Controller('oauth')
export class OauthController {
  @Get()
  test() {
    return 'test';
  }

  @Get('/:type')
  OAuth(@Param('type') param: string): string {
    console.log('OAuth');
    console.log(param);
    return 'OAuth';
  }
}
