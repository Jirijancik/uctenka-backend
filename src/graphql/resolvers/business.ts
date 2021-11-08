/* eslint-disable no-empty-pattern */

import { ApolloError } from "apollo-server-errors";
import { BusinessCreationRules } from "../../validation/business";

export default {
  Query: {
    /**
     * @DESC to Get all the Business
     * @Access Private
     */
    getBusinesses: async (parent, args, ctx, info): Promise<any> => {
      const { BusinessModel } = ctx
      const business = await BusinessModel.find();



      if (!business) {
        throw new Error('Unathorized Access');
      }

      return business;
    },
  },

// Standarad User Mutation Property
Mutation: {
  /**
   * @DESC to Create new client
   * @Params newUser
   * @Access Private
   */
  createBusiness: async (_, { newBusiness }, { BusinessModel }) => {
    try {
      const { name } = newBusiness;

      // Validate Incoming New User Arguments
      await BusinessCreationRules.validate(newBusiness, { abortEarly: false });

      // Check if the Username is taken
      let user = await BusinessModel.findOne({
        name,
      });
      if (user) {
        throw new ApolloError('Business name is already taken.', '403');
      }

      // New User's Account can be created
      user = new BusinessModel(newBusiness);

      // Save the user to the database
      let result = await user.save();

      return {result};
    } catch (err) {
      throw new ApolloError(err.message);
    }
  },
},
};
