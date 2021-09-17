import { GraphQLObjectType } from 'graphql';
import { GET_ALL_CLIENTS } from './Client';

export const rootQuery = new GraphQLObjectType({
  name: 'rootQuery',
  fields: { getAllClients: GET_ALL_CLIENTS },
});
