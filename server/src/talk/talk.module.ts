import { Module } from '@nestjs/common';
import { TalkGateway } from './talk.gateway';
import { TalkService } from './talk.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Talk, TalkSchema } from './model/talk.model';
import { Room, RoomSchema } from '../talk-room/model/room.model';
import { TalkRepository } from './talk.repository';
import { TalkController } from './talk.controller';
import { User, UserSchema } from '../user/model/user.model';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Talk.name, schema: TalkSchema },
      { name: Room.name, schema: RoomSchema },
      { name: User.name, schema: UserSchema },
    ]),
    UserModule,
  ],
  providers: [TalkGateway, TalkService, TalkRepository],
  controllers: [TalkController],
})
export class TalkModule {}
