export default {
  Query: {
    /**
     * @DESC to Get all the Clients
     * @Access Private
     */
    getClients: async (_, {}, { Client }) => {
      let clients = await Client.find();
console.log(clients)
      if (!clients) {
        throw new Error('Unathorized Access');
      }
      return clients;
    },
  },
};
