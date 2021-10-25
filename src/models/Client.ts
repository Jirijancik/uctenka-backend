import { model, Schema } from 'mongoose';
import { BusinessType } from '../types/businessType';
import { Currency } from '../types/currency';
import { PaymentMethod } from '../types/paymentMethod';
import { PaymentTerms } from '../types/paymentTerms';

interface Client {
  userId: Schema.Types.ObjectId;
  name: string;
  unifiedVatNumber: number;
  vatNumber?: number;
  currency: Currency;
  accountBalance: number;
  paymentTerms?: PaymentTerms;
  contactPerson?: string;
  email: string;
  country: string;
  street: string;
  city: string;
  postcode: number;
  mobilePhone: string;
  typeOfBussiness?: BusinessType;
  accountNumber?: number;
  paymentMethod?: PaymentMethod;
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
      type: String,
      required: true,
    },
    accountBalance: {
      type: Number,
      required: true,
    },
    paymentTerms: {
      type: Number,
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
      type: Number,
    },
    accountNumber: {
      type: Number,
    },
    paymentMethod: {
      type: Number,
    },
  },
  {
    timestamps: true,
  },
);

export const ClientModel = model<Client>('clients', ClientSchema);
