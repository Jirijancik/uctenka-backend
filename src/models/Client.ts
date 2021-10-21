import { model, Schema } from 'mongoose';

interface Client {
  userId: Schema.Types.ObjectId;
  name: string;
  unifiedVatNumber: number;
  vatNumber?: number;
  currency: number;
  accountBalance: number;
  paymentTerms?: string;
  contactPerson?: string;
  email: string;
  country: string;
  street: string;
  city: string;
  postcode: number;
  mobilePhone: string;
  typeOfBussiness?: string;
  accountNumber?: number;
  paymentMethod?: string;
}

const ClientSchema = new Schema<Client>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    unifiedVatNumber: {
      type: Number,
      required: true,
    },
    vatNumber: {
      type: Number,
    },
    currency: {
      type: Number,
      required: true,
    },
    accountBalance: {
      type: Number,
      required: true,
    },
    paymentTerms: {
      type: String,
    },
    contactPerson: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    street: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    postcode: {
      type: Number,
      required: true,
    },
    mobilePhone: {
      type: String,
      required: true,
    },
    typeOfBussiness: {
      type: String,
    },
    accountNumber: {
      type: Number,
    },
    paymentMethod: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

export const ClientModel = model<Client>('clients', ClientSchema);
