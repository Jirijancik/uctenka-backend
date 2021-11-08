import { model, Schema } from 'mongoose';
import { BusinessType } from '../types/businessType';
import { Currency } from '../types/currency';
import { PaymentMethod } from '../types/paymentMethod';

interface Business {
  accountBalance: number;
  accountNumber?: number;
  city: string;
  contactPerson?: string;
  country: string;
  currency: Currency;
  email: string;
  mobilePhone?: string;
  name: string;
  paymentMethod?: PaymentMethod;
  paymentTerms: number;
  postcode: number;
  street: string;
  typeOfBussiness: BusinessType;
  unifiedVatNumber: number;
  userId: Schema.Types.ObjectId;
  vatNumber?: number;
}

const BusinessSchema = new Schema<Business>(
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
      required: true,
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
    },
    typeOfBussiness: {
      type: Number,
      required: true,
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

export const BusinessModel = model<Business>('business', BusinessSchema);
