import { Module } from '@nestjs/common';
import { TalkGateway } from './talk.gateway';
import { TalkService } from './talk.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Talk, TalkSchema } from './model/talk.model';
import { Room, RoomSchema } from '../talk-room/model/room.model';
import { TalkRepository } from './talk.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Talk.name, schema: TalkSchema },
      { name: Room.name, schema: RoomSchema },
    ]),
  ],
  providers: [TalkGateway, TalkService, TalkRepository],
})
export class TalkModule {}
