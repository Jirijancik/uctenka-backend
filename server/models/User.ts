import * as mongoose from 'mongoose';

export interface Client extends mongoose.Document {
  name: string;
  adress: string;
  ico: string;
}

const ClientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    adress: {
      type: String,
      required: true,
    },
    ico: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
  }
);

export default mongoose.model<Client>('Client', ClientSchema);
