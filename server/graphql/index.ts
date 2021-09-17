import { GraphQLSchema } from 'graphql';
import { mutation } from './mutations';
import { rootQuery } from './queries';

export const schema = new GraphQLSchema({
  query: rootQuery,
  mutation: mutation,
});
