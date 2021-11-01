/* eslint-disable no-empty-pattern */

import { ApolloError } from "apollo-server-errors";
import { ClientCreationRules } from "../../validation/client";

export default {
  Query: {
    /**
     * @DESC to Get all the Clients
     * @Access Private
     */
    getClients: async (parent, args, ctx, info): Promise<any> => {
      const { ClientModel } = ctx
      const clients = await ClientModel.find();


      console.log("Hello", info);

      if (!clients) {
        throw new Error('Unathorized Access');
      }

      return clients;
    },
  },

// Standarad User Mutation Property
Mutation: {
  /**
   * @DESC to Create new client
   * @Params newUser
   * @Access Private
   */
  createClient: async (_, { newClient }, { ClientModel }) => {
    try {
      const { name } = newClient;

      // Validate Incoming New User Arguments
      await ClientCreationRules.validate(newClient, { abortEarly: false });

      // Check if the Username is taken
      let user = await ClientModel.findOne({
        name,
      });
      if (user) {
        throw new ApolloError('Client name is already taken.', '403');
      }

      // New User's Account can be created
      user = new ClientModel(newClient);

      // Save the user to the database
      let result = await user.save();

      return {result};
    } catch (err) {
      throw new ApolloError(err.message);
    }
  },
},
};
