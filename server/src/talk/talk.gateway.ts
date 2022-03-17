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

@WebSocketGateway({
  cors: true,
  // namespace: /\/ws-.+/,
  namespace: 'd12',
})
export class TalkGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private logger = new Logger('Talk');
  // 소켓 통신 라이프 사이클: constructor -> init -> connect -> event -> disconnect
  constructor() {
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

    return true;
  }

  @SubscribeMessage('send_talk')
  handleSubmitTalk(
    @MessageBody() talk: string,
    @ConnectedSocket() socket: Socket,
  ) {
    console.log('talk >> ', talk);
    socket.broadcast.emit('tk4w21', talk);
    // socket.on.emit('tk4w21', { talk, socketId: 'IDID' });
    return true;
  }
}
