import { GraphQLString } from 'graphql';
import { User } from '../type_defs/User';
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

export const LOGIN_USER = {
  type: User,
  args: {
    email: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  async resolve(xxx: any, args: any, context: any) {
    console.log(xxx, args, context);
    // const { email, password } = args;

    // let user = await UserModel.findOne({ email });

    // if (user) {

    // }
    // throw new Error('User already exists');
  },
};
