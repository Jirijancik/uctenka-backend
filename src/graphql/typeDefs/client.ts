import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    getClients: [Client]! @isAuth
  }

  type Client {
    _id: ID!
    name: String
    adress: String
    ico: String
    createdAt: String
    updatedAt: String
  }
`;