import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Talk } from './model/talk.model';
import { Model } from 'mongoose';
import * as mongoose from 'mongoose';

import { Room } from '../talk-room/model/room.model';
import { User, UserSchema } from '../user/model/user.model';

@Injectable()
export class TalkRepository {
  constructor(
    @InjectModel(Talk.name) private readonly talk: Model<Talk>,
    @InjectModel(Room.name) private readonly room: Model<Room>,
    @InjectModel(User.name) private readonly user: Model<User>,
  ) {}

  async getRoomList(userId: string) {
    const userModel = mongoose.model('users', UserSchema);

    const sellerOfResult = await this.room
      .find({
        sellerId: mongoose.Types.ObjectId(userId),
      })
      .populate('_sellerId', userModel)
      .populate('_buyerId', userModel);
    const buyerOfResult = await this.room
      .find({
        buyerId: mongoose.Types.ObjectId(userId),
      })
      .populate('_sellerId', userModel)
      .populate('_buyerId', userModel);

    console.log('sellerOfResult >> ', sellerOfResult);
    console.log('buyerOfResult >> ', buyerOfResult);

    if (sellerOfResult && buyerOfResult) {
      const result = { ...sellerOfResult, ...buyerOfResult };
      console.log('getRoomList && >> ', result);
      return result;
    }

    if (sellerOfResult) return sellerOfResult;
    else if (buyerOfResult) return buyerOfResult;
    else return null;
  }

  async getPrevMessage(roomId: string) {
    const result = await this.talk.find({
      _id: mongoose.Types.ObjectId(roomId),
    });

    console.log('getPrevMessage result >> ', result);
  }

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

  async saveMessage(roomId, toUserId, fromUserId, message) {
    const result = this.talk.create({
      roomId: mongoose.Types.ObjectId(roomId),
      toUserId: mongoose.Types.ObjectId(toUserId),
      fromUserId: mongoose.Types.ObjectId(fromUserId),
      content: message,
    });

    return result;
  }
}