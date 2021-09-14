import * as mongoose from 'mongoose';

export interface Invoice extends mongoose.Document {
  totalPrice: number;
  note: string;
  supplier: string;
}

const InvoiceSchema = new mongoose.Schema(
  {
    supplier: {
      type: String,
      required: true,
    },
    note: {
      type: String,
      required: true,
    },
    totalPrice: {
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

export default mongoose.model<Invoice>('Invoice', InvoiceSchema);
