import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type LibrariesDocument = HydratedDocument<Libraries>;

@Schema({
  timestamps: true,
})
export class Libraries {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  address: string;

  @Prop()
  description: string;

  @Prop({ default: [] })
  images: string[];
}

export const LibrariesSchema = SchemaFactory.createForClass(Libraries);
