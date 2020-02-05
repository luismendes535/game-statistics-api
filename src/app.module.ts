import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GameModule } from './game/game.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AppGateway } from './app.gateway';
import { GameSchema } from './game/schemas/game.schema';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

import config from "./config/keys";

@Module({
  imports: [
    MongooseModule.forRoot(config.mongoURI),
    MongooseModule.forFeature([{ name: 'Game', schema: GameSchema }]),
    GameModule,
    AuthModule,
    UsersModule,],
  controllers: [AppController],
  providers: [AppService, AppGateway],
})
export class AppModule { }
