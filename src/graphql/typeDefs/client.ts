import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    getClients: [Client]! @isAuth
  }

  type Client {
    _id: ID!
    userId: ID!
    name: String!
    unifiedVatNumber: Number!
    vatNumber: Number
    currency: Number!
    accountBalance: Number!
    paymentTerms: String
    contactPerson: String
    email: String!
    country: String!
    street: String!
    city: String!
    postcode: String!
    mobilePhone: String!
    typeOfBussiness: String!
    paymentMethod: String!
    createdAt: String
    updatedAt: String
  }
`;
