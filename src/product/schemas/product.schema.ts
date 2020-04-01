import { Schema } from 'mongoose';

export const ProductSchema = new Schema({
  name: String,
  description: String,
  price: Number,
  fechaCr: {
    type: Date,
    default: Date.now,
  },
});
