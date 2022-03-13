import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { Logger } from '@nestjs/common';

@WebSocketGateway({ cors: true })
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

  @SubscribeMessage('new_user')
  handleNewUser(
    @MessageBody() username: string,
    @ConnectedSocket() socket: Socket,
  ) {
    console.log('socket.id >> ', socket.id);
    console.log('username >> ', username);

    socket.broadcast.emit('server_res', 'Socket is connected...');

    return 'return Socket...';
  }

  @SubscribeMessage('submit_talk')
  handleSubmitTalk(
    @MessageBody() talk: string,
    @ConnectedSocket() socket: Socket,
  ) {
    console.log('talk >> ', talk);
    socket.broadcast.emit('new_talk', { talk, username: socket.id });
  }
}
