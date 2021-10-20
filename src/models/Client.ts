import { model, Schema } from 'mongoose';

const ClientSchema = new Schema(
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
      type: String,
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

export const Client = model('clients', ClientSchema);
