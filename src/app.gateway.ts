import { SubscribeMessage, WebSocketGateway, OnGatewayInit, WsResponse, OnGatewayConnection, OnGatewayDisconnect, WebSocketServer } from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import { Model } from 'mongoose';
import { Game } from './Game/interfaces/game.interface.js';
import { InjectModel } from '@nestjs/mongoose';

@WebSocketGateway()
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor(@InjectModel('Game') private readonly gameModel: Model<Game>) { }

  @WebSocketServer() wss: Server;

  private logger: Logger = new Logger('AppGateway')

  async afterInit(server: Server) {
    this.logger.log('Initialized')
    const data = await this.gameModel.find()
    this.logger.log(`DEBUG: ${data}`)
    this.wss.emit('msgToClient', data)
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`)
  }
  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`)
  }

  @SubscribeMessage('msgToServer')
  handleMessage(client: Socket, text: string): void {
    this.wss.emit('msgToClient', text)
  }
}
