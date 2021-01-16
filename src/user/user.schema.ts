import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({
    type: String,
    unique: true
  })
  nickname: string;

  @Prop({
    type: String,
    unique: true
  })
  email: string;

  // TODO: photo, description
}

export const UserSchema = SchemaFactory.createForClass(User);