import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as ForeignKey } from 'mongoose';
import { UserDocument } from 'src/user/schemas/user.schema';

export type ClipDocument = Clip & Document;

@Schema()
export class Clip {
  @Prop({
    type: String,
    unique: true
  })
  path: string;

  @Prop({
    type: ForeignKey.Types.ObjectId,
    ref: 'User'
  })
  user: UserDocument;
}

export const ClipSchema = SchemaFactory.createForClass(Clip);