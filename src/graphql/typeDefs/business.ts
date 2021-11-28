import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    getBusinesses: [Business] @isAuth
  }

  extend type Mutation {
    createBusiness(newBusiness: BusinessInput!): Business! @isAuth
  }

  input BusinessInput {
    accountNumber: Int
    bussinessType: String!
    city: String!
    contactPerson: String
    country: String!
    currency: String!
    email: String!
    mobilePhone: String!
    name: String!
    paymentMethod: String
    paymentTerms: String
    postcode: Int!
    street: String!
    unifiedVatNumber: Int!
    vatNumber: Int
  }

  type Business {
    _id: ID!
    accountBalance: Int!
    accountNumber: Int
    bussinessType: String!
    city: String!
    contactPerson: String
    country: String!
    createdAt: String
    currency: String!
    email: String!
    mobilePhone: String!
    name: String!
    paymentMethod: String
    paymentTerms: String
    postcode: Int!
    street: String!
    unifiedVatNumber: Int!
    updatedAt: String
    userId: ID!
    vatNumber: Int
  }
`;
