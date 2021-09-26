import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    getAllPosts: [Post]!
    getPostById(id: ID!): Post!
  }

  extend type Mutation {
    createNewPost(newPost: PostInput!): Post!
    editPostByID(updatedPost: PostInput, id: ID!): PostMessageResponse!
    deletePostByID(id: ID!): Post!
  }

  input PostInput {
    title: String!
    content: String!
    featuredImage: String
  }

  type Post {
    id: ID!
    title: String!
    content: String!
    featuredImage: String
    createdAt: String
    updatedAt: String
  }

  type PostMessageResponse {
    message: String!
    success: Boolean
  }
`;
