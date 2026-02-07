import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type BooksDocument = HydratedDocument<Books>;

@Schema({
  timestamps: true,
})
export class Books {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Libraries', required: true })
  library: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  author: string;

  @Prop()
  year: string;

  @Prop()
  description: string;

  @Prop({ default: [] })
  images: string[];

  @Prop({ required: true, default: true })
  isAvailable: boolean;

  @Prop({ required: true, default: '1' })
  totalCopies: string;

  @Prop({ required: true, default: '1' })
  availableCopies: string;

}

export const BooksSchema = SchemaFactory.createForClass(Books);
