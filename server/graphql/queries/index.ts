import { GraphQLObjectType } from 'graphql';
import { GET_ALL_CLIENTS } from './Client';
import { GET_ALL_USERS } from './User';

export const rootQuery = new GraphQLObjectType({
  name: 'rootQuery',
  fields: { getAllClients: GET_ALL_CLIENTS, getAllUsers: GET_ALL_USERS },
});
