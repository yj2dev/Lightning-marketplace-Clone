import { Module } from '@nestjs/common';
import { PollowController } from './pollow.controller';
import { PollowService } from './pollow.service';

@Module({
  controllers: [PollowController],
  providers: [PollowService]
})
export class PollowModule {}
