import { Injectable } from '@nestjs/common';
import { TalkRepository } from './talk.repository';

@Injectable()
export class TalkService {
  constructor(private readonly talkRepository: TalkRepository) {}

  async getMessageList(roomId: string) {
    return await this.talkRepository.getMessageList(roomId);
  }

  async getRoomList(userId: string) {
    return await this.talkRepository.getRoomList(userId);
  }

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
    // 구매자가 판매자에게 채팅을 하는 경우와 판매자가 구매자에게 하는 경우 두가지를 체크함
    let isRoom = null;
    isRoom = await this.talkRepository.isRoomBySeller(sellerId, buyerId);
    // console.log('isRoom >> ', isRoom);

    if (!isRoom) {
      isRoom = await this.talkRepository.isRoomByBuyer(sellerId, buyerId);
    }
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

      // 방 마지막 메시지 업데이트
      const updateLastMessage = await this.talkRepository.updateLastMessage(
        isRoom._id,
        message,
      );
      console.log('updateLastMessage >> ', updateLastMessage);
    }
    // console.log('roomInfo >> ', roomInfo);

    // 메시지 저장
    // roomInfo._id는 roomId와 동일함
    const saveMessage = await this.talkRepository.saveMessage(
      roomInfo._id,
      sellerId,
      buyerId,
      message,
    );

    console.log('saveMessage >> ', saveMessage);

    return roomInfo;
  }
}
