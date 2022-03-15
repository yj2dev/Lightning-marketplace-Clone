import { Module } from '@nestjs/common';
import { TalkGateway } from './talk.gateway';

@Module({
  providers: [TalkGateway],
})
export class TalkModule {}
