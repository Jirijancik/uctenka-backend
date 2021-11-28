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
  createBusiness: async (parent, args, ctx, info) => {
    // Validate Incoming User Credentials
    const { newBusiness } = args; 
    const { BusinessModel } = ctx;

    try {
     // Validate Incoming New User Arguments
      await BusinessCreationRules.validate(newBusiness, { abortEarly: false });

     // Check if the Username is taken
      let user = await BusinessModel.findOne({
        name: newBusiness?.name,
      });
      if (user) {
        throw new ApolloError('Business name is already taken.', '403');
      }

      const userID = ctx?.req?.session?.user?._id


      // New User's Account can be created
      const business = new BusinessModel({...newBusiness, userID});

      console.log({...newBusiness, userID}, ctx?.req?.session, "IN BUSINESS")
      // Save the user to the database
      const result = await business.save();

      return {result};
    } catch (err) {
      throw new ApolloError(err.message);
    }
  },
},
};
