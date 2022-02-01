import { Controller, Get, Param, Post } from '@nestjs/common';

@Controller('oauth')
export class OauthController {
  @Get()
  testGet() {
    console.log('oauth get');
    return 'test';
  }

  @Post()
  testPost() {
    console.log('oauth post');
    return 'test';
  }

  // @Get('/:type')
  // OAuth(@Param('type') param: string): {
  //   console.log(param);
  //   return 'OAuth';
  // }
}
