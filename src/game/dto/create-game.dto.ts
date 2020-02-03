import { IsString, IsEnum } from 'class-validator';
import { GamePopularity } from '../game-popularity.enum';

export class CreateGameDto {
    @IsString()
    readonly name: string;

    @IsEnum(GamePopularity)
    readonly popularity: GamePopularity;
}