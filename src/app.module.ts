import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GameModule } from './game/game.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AppGateway } from './app.gateway';
import config from "./config/keys";

@Module({
  imports: [
    MongooseModule.forRoot(config.mongoURI),
    GameModule,],
  controllers: [AppController],
  providers: [AppService, AppGateway],
})
export class AppModule { }
