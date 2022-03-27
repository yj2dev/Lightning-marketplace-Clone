import { TalkRepository } from './talk.repository';
export declare class TalkService {
    private readonly talkRepository;
    constructor(talkRepository: TalkRepository);
    getMessageList(roomId: string): Promise<import("./model/talk.model").Talk[]>;
    getRoomList(userId: string): Promise<import("../talk-room/model/room.model").Room[]>;
    sendMessage(talk: {
        senderId: string;
        receiverId: string;
        toProductId: string;
        message: string;
    }): Promise<any>;
}
