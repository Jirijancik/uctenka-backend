import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    getClients: [Client]! @isAuth
  }

  type Client {
    _id: ID!
    userId: ID!
    name: String!
    unifiedVatInt: Int!
    vatInt: Int
    currency: Int!
    accountBalance: Int!
    paymentTerms: String
    contactPerson: String
    email: String!
    country: String!
    street: String!
    city: String!
    postcode: Int!
    mobilePhone: String!
    typeOfBussiness: String
    accountInt: Int
    paymentMethod: String
    createdAt: String
    updatedAt: String
  }
`;
