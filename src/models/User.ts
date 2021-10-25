import { model, ObjectId, Schema } from 'mongoose';


export interface User {
  username?: string
  email: string
  firstName: string
  lastName: string
  password: string
  clients?: [ObjectId],
}

const UserSchema = new Schema<User>(
  {
    username: {
      type: String,
    },
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
    clients: [Schema.Types.ObjectId],
  },
  {
    timestamps: true,
  },
);

export const UserModel = model<User>('users', UserSchema);
