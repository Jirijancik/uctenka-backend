import { gql } from 'apollo-server-express';
//import Post from '../../models/Post';

export default {
  Query: {
    getAllPosts: async (_, args, context, info) => {
      const result = await context.default.Post.find();
      return result;
    },
    getPostById: async (_, { id }, { Post }) => {
      const post = await Post.findById(id);
      return post;
    },
  },
  Mutation: {
    createNewPost: async (_, { newPost }, context, info) => {
      const result = await context.default.Post.create(newPost);
      return result;
    },
    editPostByID: async (_, { id, updatedPost }, context, info) => {
      deletePostByID;
      const editedPost = await context.default.Post.findByIdAndUpdate(
        id,
        { ...updatedPost },
        { new: true }
      );
      return editedPost;
    },

    deletePostByID: async (_, { id }, context, info) => {
      const editedPost = await context.default.Post.findByIdAndDelete(
        id,
        { ...updatedPost },
        { new: true }
      );
      return { message: 'Post has been deleted', sucess: true };
    },
  },
};
