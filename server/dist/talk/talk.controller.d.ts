import { TalkService } from './talk.service';
export declare class TalkController {
    private readonly talkService;
    constructor(talkService: TalkService);
    getMessageList(userId: string): Promise<import("../talk-room/model/room.model").Room[]>;
    getRoomList(roomId: string): Promise<import("./model/talk.model").Talk[]>;
}
