import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as ForeignKey } from 'mongoose';
import { UserDocument } from 'src/user/schemas/user.schema';

export type AuthCodeDocument = AuthCode & Document;

@Schema()
export class AuthCode {
  @Prop({
    type: String,
    unique: true
  })
  code: string;

  @Prop({
    type: ForeignKey.Types.ObjectId,
    ref: 'User'
  })
  user: UserDocument;
}

export const AuthCodeSchema = SchemaFactory.createForClass(AuthCode);