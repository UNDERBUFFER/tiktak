import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Clip, ClipDocument } from './schemas/clip.schema';
import { Like, LikeDocument } from './schemas/like.schema';

@Injectable()
export class ClipsService {
  constructor(@InjectModel(Clip.name) private clipModel: Model<ClipDocument>,
    @InjectModel(Like.name) private likeModel: Model<LikeDocument>) {}
}
