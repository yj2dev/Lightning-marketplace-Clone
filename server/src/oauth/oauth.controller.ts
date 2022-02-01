import { Controller, Get, Param, Post, Query } from '@nestjs/common';
import axios from 'axios';
import * as qs from 'qs';

@Controller('oauth')
export class OauthController {
  private readonly REST_API_KEY = process.env.KAKAO_AUTH_REST_API_KEY;
  private readonly REDIRECT_URI = process.env.KAKAO_AUTH_REDIRECT_URI;
  private readonly CLIENT_SECRET = process.env.KAKAO_AUTH_CLIENT_SECRET;

  @Get('/')
  async testGet(@Query('code') code: string) {
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

    const getToken = async () => {
      try {
        const res = await axios.post(
          'https://kauth.kakao.com/oauth/token',
          queryStringPayload,
          {
            headers: {
              'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
            },
          },
        );
        console.log('getToken res data >> ', res.data);
        return res.data;
      } catch (err) {
        console.log('getToken err >> ', err);
      }
    };

    const getUser = async (access_token) => {
      if (!access_token) return;
      try {
        const res = await axios.get('https://kapi.kakao.com/v2/user/me', {
          headers: {
            'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
            authorization: `Bearer ${access_token}`,
          },
        });

        console.log('getUser res data >> ', res.data);
        return res.data;
      } catch (err) {
        console.log('getUser err >> ', err);
      }
    };

    const token = await getToken();

    const user = await getUser(token.access_token);
    // console.log('token >> ', token);
    // console.log('user >> ', user);
    // console.log(qs.stringify(user));
    return user;
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
