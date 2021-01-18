import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({
    type: String,
    unique: true,
    required: true
  })
  nickname: string;

  @Prop({
    type: String,
    unique: true,
    required: true
  })
  email: string;

  @Prop({
    type: String,
    default: ''
  })
  description: string;

  @Prop({
    type: String,
    default: ''
  })
  avatarPath: string;
}

export const UserSchema = SchemaFactory.createForClass(User);