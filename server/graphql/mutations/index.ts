import { GraphQLObjectType } from 'graphql';
import { CREATE_CLIENT, DELETE_CLIENT } from './Client';
import { REGISTER_USER } from './User';

export const mutation = new GraphQLObjectType({
  name: 'mutation',
  fields: {
    createClient: CREATE_CLIENT,
    deleteClient: DELETE_CLIENT,
    registerUser: REGISTER_USER,
  },
});
