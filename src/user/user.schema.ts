import * as mongoose from 'mongoose';

export const BlogSchema = new mongoose.Schema({
    nickname: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        unique: true
    }
})