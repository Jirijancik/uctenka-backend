/* eslint-disable no-empty-pattern */

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
};
