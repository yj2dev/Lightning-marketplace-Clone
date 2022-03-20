import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Talk } from './model/talk.model';
import mongoose, { Model } from 'mongoose';
import { Room } from '../talk-room/model/room.model';
import { Member } from '../talk-member/model/member.model';

@Injectable()
export class TalkRepository {
  constructor(
    @InjectModel(Talk.name) private readonly talk: Model<Talk>,
    @InjectModel(Room.name) private readonly room: Model<Room>,
    @InjectModel(Member.name) private readonly member: Model<Member>,
  ) {}

  // async isRoom({}): Promise<boolean> {}

  async saveMessage({ toUserId, fromUserId, message }) {
    const result = this.talk.create({
      toUserId: mongoose.Types.ObjectId(toUserId),
      fromUserId: mongoose.Types.ObjectId(toUserId),
      message,
    });
  }
}
