import { ApolloError } from 'apollo-server-express';
import { NewPostRules } from '../../validation/post';

const PostLabels = {
  docs: 'posts',
  limit: 'perPage',
  nextPage: 'next',
  prevPage: 'prev',
  meta: 'paginator',
  page: 'currentPage',
  pagingCounter: 'slNo',
  totalDocs: 'totalPosts',
  totalPages: 'totalPages',
};

export default {
  Query: {
    /**
     * @DESC to Get all the Posts
     * @Access Public
     */
    allPosts: async (_, {}, { Post }) => {
      const posts = await Post.find().populate('author');
      return posts;
    },
    /**
     * @DESC to Get single the Post by ID
     * @Access Public
     */
    getPostById: async (_, { id }, { Post }) => {
      const post = await Post.findById(id).populate('author');
      return post;
    },
    /**
     * @DESC to Get Posts by Pagination variables
     * @Access Public
     */
    getPostsWithPagination: async (_, { page, limit, user_id }, { Post }) => {
      const options = {
        page: page || 1,
        limit: limit || 10,
        customLabels: PostLabels,
        sort: {
          createdAt: -1,
        },
        populate: 'author',
      };

      let query = {};
      if (user_id) {
        query = {
          author: user_id,
        };
      }

      const posts = await Post.paginate(query, options);

      return posts;
    },
    /**
     * @DESC to Get Posts by Pagination variables
     * @Access Public
     */
    getMyPostsWithPagination: async (_, { page, limit }, { Post, user }) => {
      const options = {
        page: page || 1,
        limit: limit || 10,
        customLabels: PostLabels,
        sort: {
          createdAt: -1,
        },
        populate: 'author',
      };

      const posts = await Post.paginate(
        {
          author: user.id,
        },
        options,
      );

      return posts;
    },
  },
  Mutation: {
    /**
         * @DESC to Create new Post
         * @Params newPost{ 
                title!, 
                content!, 
                featuredImage 
            }
         * @Access Private
         */
    createPost: async (_, { newPost }, { Post, user }) => {
      const { title, content } = newPost;

      // Validate the incoming new Post arguments
      await NewPostRules.validate(
        {
          title,
          content,
        },
        {
          abortEarly: false,
        },
      );
      // Once the Validations are passed Create New Post
      const post = new Post({
        ...newPost,
        author: user.id,
      });
      // Save the post
      let result = await post.save();
      result = {
        ...result.toObject(),
        id: result._id.toString(),
      };
      return result;
    },
    /**
         * @DESC to Update an Existing Post by ID
         * @Params updatedPost { 
                title!, 
                content!, 
                featuredImage 
            }
         * @Access Private
         */
    updatePost: async (_, { updatedPost, id }, { Post, user }) => {
      try {
        const { title, content } = updatedPost;

        await NewPostRules.validate(
          {
            title,
            content,
          },
          {
            abortEarly: false,
          },
        );

        const post = await Post.findOneAndUpdate(
          {
            _id: id,
            author: user.id,
          },
          updatedPost,
          {
            new: true,
          },
        );

        if (!post) {
          throw new Error('Unathorized Access');
        }

        // Populate the Author Fields
        await post.populate('author').execPopulate();

        return post;
      } catch (err) {
        throw new ApolloError(err.message);
      }
    },
    /**
     * @DESC to Delete an Existing Post by ID
     * @Params id!
     * @Access Private
     */
    deletePost: async (_, { id }, { Post, user }) => {
      try {
        const post = await Post.findOneAndDelete({
          _id: id,
          author: user.id,
        });

        if (!post) {
          throw new Error('Unathorized Access');
        }
        return {
          success: true,
          message: 'Post Deleted Successfully.',
        };
      } catch (err) {
        throw new ApolloError(err.message);
      }
    },
  },
};
