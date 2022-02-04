import { Controller, Get, Param, Post, Query } from '@nestjs/common';
import axios from 'axios';
import * as qs from 'qs';
import * as cache from 'memory-cache';

@Controller('oauth')
export class OauthController {
  private readonly REST_API_KEY = process.env.KAKAO_AUTH_REST_API_KEY;
  private readonly REDIRECT_URI = process.env.KAKAO_AUTH_REDIRECT_URI;
  private readonly CLIENT_SECRET = process.env.KAKAO_AUTH_CLIENT_SECRET;

  @Get('/kakao')
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

  @Get('/cache')
  createCache23() {
    return 'succeed';
  }
  @Get('/cache/good')
  createCache233() {
    return 'suc3213ceed';
  }

  @Get('/cache/create')
  createCache() {
    cache.put('undefined102', 'value102');
    cache.put('undefined106', 'value106', 1000, (key, value) => {
      console.log(`[${key}]: ${value} 등록!`);

      return 'succeed';
    });
    return 'succeed';
  }

  @Get('/cache/show/:key')
  showCache(@Param('key') key) {
    console.log(key);
    console.log(cache.size());
    console.log(cache.get(key));
    return 'succeed';
  }

  @Get('/cache/delete')
  deleteCache() {
    cache.put('undefined102', 'value102');
    return 'succeed';
  }
}
