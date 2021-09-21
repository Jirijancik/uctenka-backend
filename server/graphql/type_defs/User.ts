import { GraphQLObjectType, GraphQLString, GraphQLID } from 'graphql';
import { gql } from 'apollo-server-koa';

const typeDefs = gql`
  type User {
    _id: ID
    email: String!
    name: String!
    password: String!
  }
`;

export const User = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    _id: { type: GraphQLID },
    email: { type: GraphQLString },
    name: { type: GraphQLString },
    password: { type: GraphQLString },
  }),
});
