import * as mongoose from 'mongoose';

export const GameSchema = new mongoose.Schema({
    name: String,
    popularity: Number,
});