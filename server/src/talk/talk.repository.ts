import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Talk } from './model/talk.model';
import mongoose, { Model } from 'mongoose';

@Injectable()
export class TalkRepository {
  constructor(@InjectModel(Talk.name) private readonly talk: Model<Talk>) {}

  async saveMessage({ toUserId, fromUserId, message }) {
    const result = this.talk.create({
      toUserId: mongoose.Types.ObjectId(toUserId),
      fromUserId: mongoose.Types.ObjectId(toUserId),
      message,
    });
  }
}
