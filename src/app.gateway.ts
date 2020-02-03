import { SubscribeMessage, WebSocketGateway, OnGatewayInit, WsResponse, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';

@WebSocketGateway()
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  private logger: Logger = new Logger('AppGateway')

  afterInit(server: Server) {
    this.logger.log('Initialized')
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`)
  }
  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client disconnected: ${client.id}`)
  }

  @SubscribeMessage('msgToServer')
  handleMessage(client: Socket, payload: any): WsResponse<string> {
    return { event: 'msgToClient', data: payload }; //Whateve is in data should match the type up above on WsResponse
  }
}
