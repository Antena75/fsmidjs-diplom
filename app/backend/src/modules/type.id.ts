import { Schema } from 'mongoose';

export type ID = string | Schema.Types.ObjectId;
export type RentalStatus = string | "reserved" | "active" | "completed" | "cancelled";


