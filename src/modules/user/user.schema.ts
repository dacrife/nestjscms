import { Schema } from 'mongoose';

export const UserSchema = new Schema({
  name: String,
  years: Number,
  fechaCr: {
    type: Date,
    default: Date.now,
  },
});
