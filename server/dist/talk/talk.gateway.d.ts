import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { TalkService } from './talk.service';
export declare class TalkGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    private readonly talkService;
    private logger;
    constructor(talkService: TalkService);
    afterInit(): void;
    handleConnection(socket: Socket): void;
    handleDisconnect(socket: Socket): void;
    server: Server;
    handleSubmitTalk(talk: any, socket: Socket): Promise<any>;
    socketTest(body: any, socket: Socket): Promise<void>;
}
