import { Injectable } from '@nestjs/common';
import { TalkRepository } from './talk.repository';

@Injectable()
export class TalkService {
  constructor(private readonly talkRepository: TalkRepository) {}

  async sendMessage(talk: {
    senderId: string;
    receiverId: string;
    toProductId: string;
    message: string;
  }) {
    const {
      senderId: buyerId,
      receiverId: sellerId,
      toProductId,
      message,
    } = talk;
    // console.log(sellerId);

    // 방이 만들어져 있는지 확인
    const isRoom = await this.talkRepository.isRoom(sellerId, buyerId);
    // console.log('isRoom >> ', isRoom);

    let roomInfo;
    // 방이 없으면 생성
    if (!isRoom) {
      roomInfo = await this.talkRepository.createRoom(
        sellerId,
        buyerId,
        toProductId,
        message,
      );
    } else {
      roomInfo = isRoom;
    }

    // console.log('roomInfo >> ', roomInfo);
    return roomInfo._id;
  }
}
