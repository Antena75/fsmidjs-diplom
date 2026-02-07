import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, HydratedDocument } from 'mongoose';
import { ID } from '../../type.id';

export type MessageDocument = HydratedDocument<Message>;

@Schema({
  timestamps: { createdAt: 'sentAt', updatedAt: false}
})
export class Message extends Document {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Users' })
  authorId: ID;

  @Prop({ required: true })
  text: string;

  @Prop({default: null})
  readAt: Date;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
