import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Game } from './interfaces/game.interface.js';
import { GamePopularity } from './game-popularity.enum.js';


@Injectable()
export class GameService {
    constructor(@InjectModel('Game') private readonly gameModel: Model<Game>) { }

    async findAll(): Promise<Game[]> {
        return await this.gameModel.find();
    }

    async findOne(id: string): Promise<Game> {
        return await this.gameModel.findOne({ _id: id })
    }

    async create(game: Game): Promise<Game> {
        const newGame = new this.gameModel(game);
        return await newGame.save();
    }
    async getTop(top: GamePopularity): Promise<Game[]> {
        return await this.gameModel.find({}, [], {
            skip: 0, // Starting Row
            limit: top, // Ending Row
            sort: {
                popularity: -1 //Sort by Popularity DESC
            }
        })
    }
}
