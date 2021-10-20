import { ApolloError } from 'apollo-server-express';
import { compare, hash } from 'bcryptjs';
import { issueAuthToken, serializeUser } from '../../utils/Userfunctions';
import { UserAuthenticationRules, UserRegisterationRules } from '../../validation/user';

export default {
  // Standarad User Query Property
  Query: {
    /**
     * @DESC to authenticate using parameters
     * @Params { email, password }
     * @Access Public
     */
    loginUser: async (_, { email, password }, { User }) => {
      // Validate Incoming User Credentials
      await UserAuthenticationRules.validate({ email, password }, { abortEarly: false });
      // Find the user from the database
      let user = await User.findOne({
        email,
      });
      // If User is not found
      if (!user) {
        throw new ApolloError('Username or password were incorrect', '404');
      }
      // If user is found then compare the password
      const isMatch = await compare(password, user.password);
      // If Password don't match
      if (!isMatch) {
        throw new ApolloError('Username or password were incorrect', '403');
      }
      user = await serializeUser(user);
      // Issue Token
      const token = await issueAuthToken(user);
      return {
        user,
        token,
      };
    },
    /**
     * @DESC to get the authenticated User
     * @Headers Authorization
     * @Access Private
     */
    authUser: (_, __, { req: { user } }) => user,
  },
  // Standarad User Mutation Property
  Mutation: {
    /**
     * @DESC to Register new user
     * @Params newUser{ firstName, lastName, email, password }
     * @Access Public
     */
    registerUser: async (_, { newUser }, { User }) => {
      try {
        const { email } = newUser;

        // Validate Incoming New User Arguments
        await UserRegisterationRules.validate(newUser, { abortEarly: false });

        // Check if the Username is taken
        let user = await User.findOne({
          email,
        });
        if (user) {
          throw new ApolloError('Username is already taken.', '403');
        }

        // Check is the Email address is already registred
        user = await User.findOne({
          email,
        });
        if (user) {
          throw new ApolloError('Email is already registred.', '403');
        }

        // New User's Account can be created
        user = new User(newUser);

        // Hash the user password
        user.password = await hash(user.password, 10);

        // Save the user to the database
        let result = await user.save();
        result = await serializeUser(result);
        // Issue Token
        const token = await issueAuthToken(result);
        return {
          token,
          user: result,
        };
      } catch (err) {
        throw new ApolloError(err.message);
      }
    },
  },
};
