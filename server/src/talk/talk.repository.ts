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

  async updateLastMessage(roomId: string, message: string): Promise<Room> {
    const result = await this.room.findOneAndUpdate(
      { _id: mongoose.Types.ObjectId(roomId) },
      { lastContent: message },
    );
    return result;
  }

  async getMessageList(roomId: string): Promise<Talk[]> {
    const userModel = mongoose.model('users', UserSchema);

    const result = await this.talk
      .find({
        roomId: mongoose.Types.ObjectId(roomId),
      })
      .populate('_toUserId', userModel)
      .populate('_fromUserId', userModel);
    return result;
  }

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

    // console.log('sellerOfResult >> ', sellerOfResult);
    // console.log('buyerOfResult >> ', buyerOfResult);

    if (sellerOfResult && buyerOfResult) {
      const result = { ...sellerOfResult, ...buyerOfResult };
      // console.log('getRoomList && >> ', result);
      return result;
    }

    if (sellerOfResult) return sellerOfResult;
    else if (buyerOfResult) return buyerOfResult;
    else return null;
  }

  // 판매자와 구매자를 일치 시킨 후 확인함
  async isRoomBySeller(sellerId: string, buyerId: string): Promise<Room> {
    console.log('sellerId >> ', sellerId);
    console.log('buyerId >> ', buyerId);

    const result = this.room.findOne({
      sellerId: mongoose.Types.ObjectId(sellerId),
      buyerId: mongoose.Types.ObjectId(buyerId),
    });

    return result;
  }

  // 판매자와 구매자의 위치를 바꾼 후 확인함
  async isRoomByBuyer(sellerId: string, buyerId: string): Promise<Room> {
    console.log('sellerId >> ', sellerId);
    console.log('buyerId >> ', buyerId);

    const result = this.room.findOne({
      sellerId: mongoose.Types.ObjectId(buyerId),
      buyerId: mongoose.Types.ObjectId(sellerId),
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
