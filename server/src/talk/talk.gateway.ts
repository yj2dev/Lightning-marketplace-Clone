import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { Logger } from '@nestjs/common';
import { Talk } from './model/talk.model';
import { TalkService } from './talk.service';

@WebSocketGateway({
  cors: true,
  namespace: /\/nsp-.+/,
  // namespace: 'd12',
})
export class TalkGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private logger = new Logger('Talk');
  // 소켓 통신 라이프 사이클: constructor -> init -> connect -> event -> disconnect
  constructor(private readonly talkService: TalkService) {
    this.logger.log('constructor talk...');
  }
  afterInit(): void {
    this.logger.log('init talk...');
  }
  handleConnection(@ConnectedSocket() socket: Socket): void {
    this.logger.log(
      `connected socket[nsp, id] >> ["${socket.nsp.name}", "${socket.id}"]`,
    );
  }
  handleDisconnect(@ConnectedSocket() socket: Socket): void {
    this.logger.log(
      `disconnected socket[nsp, id] >> ["${socket.nsp.name}", "${socket.id}"]`,
    );
  }

  @WebSocketServer() public server: Server;

  @SubscribeMessage('sendMessage')
  async handleSubmitTalk(
    @MessageBody() talk: any,
    @ConnectedSocket() socket: Socket,
  ) {
    console.log('talk >> ', talk);

    const roomInfo = await this.talkService.sendMessage(talk);
    console.log('roomInfo >> ', roomInfo);

    socket.broadcast.emit(`${roomInfo._id}-receiveMessage`, {
      message: talk.message,
    });
    // socket.emit(`${roomInfo._id}-receiveMessage`, {
    //   message: talk.message,
    // });
    // socket.broadcast.emit(`${roomInfo._id}-receiveMessage`, {
    //   content: talk.message,
    //   createdAt: '2022-03-21T06:04:45.711Z',
    //   fromUserId: '621494c3b348c807b4337892',
    //   fromUserName: '아나바다',
    //   fromUserProfileURL:
    //     'https://localhost:8000/static/user_profile/아나바다1646748000614',
    //   isMine: true,
    //   notRead: true,
    //   toUserId: '62149490b348c807b4337881',
    //   toUserName: '해적오리',
    //   toUserProfileURL:
    //     'https://localhost:8000/static/user_profile/관리자1647094073332',
    // });

    // socket.emit(`${roomInfo._id}-receiveMessage`, roomInfo);
    // socket.emit(`${roomInfo._id}-receiveMessage`, {
    //   // userId: '994941',
    //   // message: talk.message,
    //   // createdAt: new Date(Date.now()).toISOString(),
    // });
  }
}
