import { Talk } from './model/talk.model';
import { Model } from 'mongoose';
import { Room } from '../talk-room/model/room.model';
import { User } from '../user/model/user.model';
export declare class TalkRepository {
    private readonly talk;
    private readonly room;
    private readonly user;
    constructor(talk: Model<Talk>, room: Model<Room>, user: Model<User>);
    updateLastMessage(roomId: string, message: string): Promise<Room>;
    getMessageList(roomId: string): Promise<Talk[]>;
    getRoomList(userId: string): Promise<Room[]>;
    isRoomBySeller(sellerId: string, buyerId: string): Promise<Room>;
    isRoomByBuyer(sellerId: string, buyerId: string): Promise<Room>;
    createRoom(sellerId: string, buyerId: string, toProductId: string, message: string): Promise<any>;
    saveMessage(roomId: any, toUserId: any, fromUserId: any, message: any): Promise<Talk>;
}
