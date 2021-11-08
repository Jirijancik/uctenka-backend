import { model, ObjectId, Schema } from 'mongoose';


export interface User {
  businessPartners?: ObjectId[]
  businesses?: ObjectId[],
  email: string
  firstName: string
  lastName: string
  password: string
}

const UserSchema = new Schema<User>(
  {
    email: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    businesses: [Schema.Types.ObjectId],
    businessPartners: [Schema.Types.ObjectId],
  },
  {
    timestamps: true,
  },
);

export const UserModel = model<User>('users', UserSchema);
