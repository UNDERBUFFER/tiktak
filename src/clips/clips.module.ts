import { Module } from '@nestjs/common';
import { ClipsController } from './clips.controller';
import { ClipsService } from './clips.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Clip, ClipSchema } from './schemas/clip.schema';
import { Like, LikeSchema } from './schemas/like.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Clip.name,
        schema: ClipSchema
      },
      {
        name: Like.name,
        schema: LikeSchema
      }
    ])
  ],
  controllers: [ClipsController],
  providers: [ClipsService]
})
export class ClipsModule {}
