import { GraphQLString } from 'graphql';
import { User } from '../types/User';
import { User as UserModel } from '../../models';

export const REGISTER_USER = {
  type: User,
  args: {
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  async resolve(_: any, args: any) {
    const { name, email, password } = args;

    let user = await UserModel.findOne({ name });

    if (!user) {
      user = await new UserModel({ name, email, password }).save();

      return await UserModel.find();
    }
    throw new Error('User already exists');
  },
};
