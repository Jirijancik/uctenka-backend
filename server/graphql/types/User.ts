import { GraphQLObjectType, GraphQLString, GraphQLID } from 'graphql';

export const User = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    _id: { type: GraphQLID },
    email: { type: GraphQLString },
    name: { type: GraphQLString },
    password: { type: GraphQLString },
  }),
});
