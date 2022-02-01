import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  @Get()
  rootGet() {
    return 'rootGet';
  }

  @Post()
  rootPost() {
    return 'rootPost';
  }
}
