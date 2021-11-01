import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    getClients: [Client] @isAuth
  }

  extend type Mutation {
    createClient(newClient: ClientInput!): Client! @isAuth
  }

  input ClientInput  {
    userId: ID!
    name: String!
    unifiedVatNumber: Int!
    vatNumber: Int
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
    accountNumber: Int
    paymentMethod: String
  }

  type Client {
    _id: ID!
    userId: ID!
    name: String!
    unifiedVatNumber: Int!
    vatNumber: Int
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
    accountNumber: Int
    paymentMethod: String
    createdAt: String
    updatedAt: String
  }
`;
