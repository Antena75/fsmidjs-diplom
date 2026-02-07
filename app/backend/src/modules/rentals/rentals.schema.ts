import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { ID, RentalStatus } from '../type.id';

export type RentalsDocument = HydratedDocument<Rentals>;

@Schema({
timestamps: { createdAt: true, updatedAt: false}
})
export class Rentals {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Users' })
  public userId: ID;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Libraries' })
  public libraryId: ID;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Books' })
  public bookId: ID;

  @Prop({ required: true })
  public dateStart: Date;

  @Prop({ required: true })
  public dateEnd: Date;

  @Prop({ required: true, default: "reserved" })
  public status: RentalStatus;
}

export const RentalsSchema = SchemaFactory.createForClass(Rentals);
