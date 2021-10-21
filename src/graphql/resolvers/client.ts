/* eslint-disable no-empty-pattern */

export default {
  Query: {
    /**
     * @DESC to Get all the Clients
     * @Access Private
     */
    getClients: async (parent, args, ctx, info): Promise<any> => {
      //const clients = await Client.find();

      const { ClientModel } = ctx

      console.log("Hello", info);

      // if (!clients) {
      //   throw new Error('Unathorized Access');
      // }

     // return clients;
    },
  },
};
