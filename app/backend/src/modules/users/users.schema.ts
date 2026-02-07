import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';

export type UsersDocument = HydratedDocument<Users>;

@Schema()
export class Users extends Document {
  @Prop({ required: true, unique: [true, 'Пользователь уже зарегистрирован!'] })
  email: string;

  @Prop({ required: true })
  passwordHash: string;

  @Prop({ required: true })
  name: string;

  @Prop()
  contactPhone: string;

  @Prop({ required: true, default: 'client' })
  role: string;
}

export const UsersSchema = SchemaFactory.createForClass(Users);
