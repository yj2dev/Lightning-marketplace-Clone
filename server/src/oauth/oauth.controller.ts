import { Controller, Get, Param, Post, Query } from '@nestjs/common';
import axios from 'axios';
import * as qs from 'qs';

@Controller('oauth')
export class OauthController {
  private readonly REST_API_KEY = process.env.KAKAO_AUTH_REST_API_KEY;
  private readonly REDIRECT_URI = process.env.KAKAO_AUTH_REDIRECT_URI;
  private readonly CLIENT_SECRET = process.env.KAKAO_AUTH_CLIENT_SECRET;

  @Get('/')
  testGet(@Query('code') code: string) {
    console.log('oauth get');
    console.log('code >> ', code);

    const payload = {
      grant_type: 'authorization_code',
      client_id: this.REST_API_KEY,
      redirect_uri: this.REDIRECT_URI,
      code,
      client_secret: this.CLIENT_SECRET,
    };

    const queryStringPayload = qs.stringify(payload);

    console.log('payload >> ', payload);
    console.log('queryStringPayload >> ', queryStringPayload);

    axios
      .post('https://kauth.kakao.com/oauth/token', queryStringPayload, {
        headers: {
          'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
        },
      })
      .then((res) => {
        console.log('succeed');
        console.log(res.data);
      })
      .catch((err) => {
        console.log('failed...');
        console.log(err.data);
      });
  }

  @Get('/kakao')
  testGet2(@Param() param) {
    console.log('oauth get2');
    console.log('param2 >> ', param);
    return 'test_KAKAO';
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
