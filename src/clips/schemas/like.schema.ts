import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as ForeignKey } from 'mongoose';
import { UserDocument } from 'src/user/schemas/user.schema';
import { ClipDocument } from './clip.schema';

export type LikeDocument = Like & Document;

@Schema()
export class Like {
  @Prop({
    type: ForeignKey.Types.ObjectId,
    ref: 'Clip',
  })
  clip: ClipDocument;

  @Prop({
    type: ForeignKey.Types.ObjectId,
    ref: 'User',
  })
  user: UserDocument;
}

export const LikeSchema = SchemaFactory.createForClass(Like);
