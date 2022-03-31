import { Controller, Get, Param } from '@nestjs/common';
import { TalkService } from './talk.service';

console.log('[ talk environment ]');
console.log(process.env.AWS_S3_BUCKET_NAME);
console.log(process.env.AWS_S3_REGION);

@Controller('talk')
export class TalkController {
  constructor(private readonly talkService: TalkService) {}
  @Get(':userId/room-list')
  async getMessageList(@Param('userId') userId: string) {
    return await this.talkService.getRoomList(userId);
  }

  @Get(':roomId/message-list')
  async getRoomList(@Param('roomId') roomId: string) {
    return await this.talkService.getMessageList(roomId);
  }
}
