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

  @SubscribeMessage('rootServer')
  rootConnect(@MessageBody() body: string, @ConnectedSocket() socket: Socket) {
    console.log('connect socket...');
    console.log('socket.id, nsp >> ', socket.id, socket.nsp.name);
    console.log('body >> ', body);

    // socket.emit('rootClient', { connect: true });
    // socket.emit('rootClient2', { message: 'happy birth day' });

    this.server.emit('rootClient', { connect: true });
    this.server.emit('rootClient2', { message: 'happy birth day' });

    return { succeed: true };
  }

  @SubscribeMessage('sendMessage')
  async handleSubmitTalk(
    @MessageBody() talk: any,
    @ConnectedSocket() socket: Socket,
  ) {
    console.log('talk >> ', talk);
    const id = '62277b01ac24763714311d7a';
    // socket.join('testRoom');

    socket
      // .to('testRoom')
      .emit(`${id}-spread`, {
        userId: 'fucking',
        message: talk.message,
        createdAt: new Date(Date.now()).toISOString(),
      });

    return await this.talkService.sendMessage(talk);
    // socket.broadcast.emit('tk4w21', talk);

    // return await this.
  }
}
