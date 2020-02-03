import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { GameService } from './game.service';
import { CreateGameDto } from './dto/create-game.dto';
import { GamePopularity } from './game-popularity.enum';
import { Game } from './interfaces/game.interface';
import { ParseIntPipe } from '../common/pipes/parse-int.pipe';

@Controller('game')
export class GameController {
    constructor(private gameService: GameService) {
    }
    @Get()
    async findAll(): Promise<Game[]> {
        return this.gameService.findAll()
    }
    @Get(':id')
    async findOne(@Param('id') id): Promise<Game> {
        return this.gameService.findOne(id)
    }

    @Post()
    create(@Body() createGameDto: CreateGameDto): Promise<Game> {
        return this.gameService.create(createGameDto)
    }

    @Get('/top/:popularity')
    async getTopGames(@Param('popularity', new ParseIntPipe()) popularity: GamePopularity) {
        return this.gameService.getTop(popularity)
    }
}
