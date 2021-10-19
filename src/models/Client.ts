import { model, Schema } from 'mongoose';

const ClientSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    adress: {
      type: String,
    },
    ico: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Client = model('clients', ClientSchema);
