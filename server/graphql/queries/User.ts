import { GraphQLList } from 'graphql';
import { User } from '../type_defs/User';
import { User as UserModel } from '../../models';

export const GET_ALL_USERS = {
  type: new GraphQLList(User),
  resolve() {
    return UserModel.find();
  },
};
