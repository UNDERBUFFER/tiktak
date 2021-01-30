import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { writeFile } from 'fs';
import { Model } from 'mongoose';
import { join } from 'path';
import { UserDocument } from 'src/user/schemas/user.schema';
import { Clip as ClipInterface } from './interfaces/clip.interface';
import { Like as LikeInterface } from './interfaces/like.interface';
import { Clip, ClipDocument } from './schemas/clip.schema';
import { Like, LikeDocument } from './schemas/like.schema';
import { randomBytes } from 'crypto';

@Injectable()
export class ClipsService {
  fileFormat: string;
  constructor(
    @InjectModel(Clip.name) private clipModel: Model<ClipDocument>,
    @InjectModel(Like.name) private likeModel: Model<LikeDocument>,
  ) {
    this.fileFormat = process.env.FILE_FORMAT ?? 'mp4';
  }

  async create(user: UserDocument, path: string): Promise<ClipDocument> {
    const data: ClipInterface = { path, user };
    const clip = new this.clipModel(data);
    return clip.save();
  }

  async getById(id: string): Promise<ClipDocument> {
    const clip = await this.clipModel.findById(id).exec();
    return clip;
  }

  async getByUser(user: UserDocument): Promise<ClipDocument[]> {
    const clips = await this.clipModel.find({
      user,
    });
    return clips;
  }

  async like(clipId: string, user: UserDocument): Promise<LikeDocument> {
    const data: LikeInterface = {
      clip: await this.getById(clipId),
      user,
    };
    const like = new this.likeModel(data);
    return like.save();
  }

  generateFileName(uniqueString: string): string {
    return `${uniqueString}-clip-${randomBytes(20).toString('hex')}.${
      this.fileFormat
    }`;
  }

  uploadFileToSystem(filename: string, buffer: Buffer): string {
    const path = `${join(
      __dirname,
      '..',
      '..',
      'public',
      'clips',
    )}/${filename}`;
    writeFile(path, buffer, (err) => {
      if (err) throw err;
    });
    return path;
  }
}
