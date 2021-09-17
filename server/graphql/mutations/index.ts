import { GraphQLObjectType } from 'graphql';
import { CREATE_CLIENT, DELETE_CLIENT } from './Client';

export const mutation = new GraphQLObjectType({
  name: 'mutation',
  fields: { createClient: CREATE_CLIENT, deleteClient: DELETE_CLIENT },
});
