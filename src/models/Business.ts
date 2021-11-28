import { model, Schema, Types } from 'mongoose';
import { BusinessType } from '../types/businessType';
import { Currency } from '../types/currency';
import { PaymentMethod } from '../types/paymentMethod';
import { PaymentTerms } from '../types/paymentTerms';

interface Business {
  readonly _id: Types.ObjectId; 
  accountBalance: number;
  accountNumber: number;
  bussinessType: BusinessType;
  city: string;
  contactPerson?: string;
  country: string;
  currency: Currency;
  email: string;
  mobilePhone: string;
  name: string;
  paymentMethod?: PaymentMethod;
  paymentTerms?: PaymentTerms;
  postcode: number;
  street: string;
  unifiedVatNumber: number;
  userId: Types.ObjectId;
  vatNumber?: number;
}

const BusinessSchema = new Schema<Omit<Business, "_id">>(
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
    bussinessType: {
      type: String,
      required: true,
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
    _id: true,
    versionKey: false
  },
);

export const BusinessModel = model<Business>('business', BusinessSchema);
