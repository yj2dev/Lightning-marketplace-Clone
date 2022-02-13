import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  @Get()
  CONNECT_ROOT_API_GET_TEST() {
    return '[ROOT API] GET: succeed';
  }

  @Post()
  CONNECT_ROOT_API_POST_TEST() {
    return '[ROOT API] POST: succeed';
  }
}
