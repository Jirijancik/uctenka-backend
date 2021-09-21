import { GraphQLObjectType, GraphQLString, GraphQLID } from 'graphql';
import { gql } from 'apollo-server-koa';

const typeDefs = gql``;

export interface IClient {
  name: string;
  adress: string;
  ico: string;
}

export const Client = new GraphQLObjectType({
  name: 'Client',
  fields: () => ({
    _id: { type: GraphQLID },
    adress: { type: GraphQLString },
    ico: { type: GraphQLString },
    name: { type: GraphQLString },
  }),
});
