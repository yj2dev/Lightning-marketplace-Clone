import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Talk } from './model/talk.model';
import { Model } from 'mongoose';
import * as mongoose from 'mongoose';

import { Room } from '../talk-room/model/room.model';

@Injectable()
export class TalkRepository {
  constructor(
    @InjectModel(Talk.name) private readonly talk: Model<Talk>,
    @InjectModel(Room.name) private readonly room: Model<Room>,
  ) {}

  async isRoom(sellerId: string, buyerId: string): Promise<Room> {
    console.log('sellerId >> ', sellerId);
    console.log('buyerId >> ', buyerId);

    const result = this.room.findOne({
      sellerId: mongoose.Types.ObjectId(sellerId),
      buyerId: mongoose.Types.ObjectId(buyerId),
    });

    return result;
  }

  async createRoom(
    sellerId: string,
    buyerId: string,
    toProductId: string,
    message: string,
  ): Promise<any> {
    const result = this.room.create({
      sellerId: mongoose.Types.ObjectId(sellerId),
      buyerId: mongoose.Types.ObjectId(buyerId),
      toProductId: mongoose.Types.ObjectId(toProductId),
      lastContent: message,
    });

    console.log('create room result >> ', result);

    return result;
  }

  async saveMessage({ toUserId, fromUserId, message }) {
    const result = this.talk.create({
      toUserId: mongoose.Types.ObjectId(toUserId),
      fromUserId: mongoose.Types.ObjectId(toUserId),
      message,
    });
  }
}
