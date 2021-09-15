import { GraphQLSchema, GraphQLObjectType } from 'graphql';
import { CREATE_CLIENT, DELETE_CLIENT } from './mutations/Client';
import { GET_ALL_CLIENTS } from './queries/Client';

const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  fields: { getAllClients: GET_ALL_CLIENTS },
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: { createClient: CREATE_CLIENT, deleteClient: DELETE_CLIENT },
});

export const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
