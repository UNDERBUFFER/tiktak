import { Module } from '@nestjs/common';
import { ClipsController } from './clips.controller';
import { ClipsService } from './clips.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Clip, ClipSchema } from './schemas/clip.schema';
import { Like, LikeSchema } from './schemas/like.schema';
import { UserService } from 'src/user/user.service';
import { User, UserSchema } from 'src/user/schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Clip.name,
        schema: ClipSchema,
      },
      {
        name: Like.name,
        schema: LikeSchema,
      },
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [ClipsController],
  providers: [ClipsService, UserService],
})
export class ClipsModule {}
