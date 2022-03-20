import { Controller, Get, Param } from '@nestjs/common';
import { TalkService } from './talk.service';

@Controller('talk')
export class TalkController {
  constructor(private readonly talkService: TalkService) {}
  @Get(':userId/room-list')
  async getRoomList(@Param('userId') userId: string) {
    return await this.talkService.getRoomList(userId);
  }
}
