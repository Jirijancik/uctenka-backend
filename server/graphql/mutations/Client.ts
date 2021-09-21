import { GraphQLID, GraphQLString } from 'graphql';
import { Client } from '../type_defs/Client';
import { Client as ClientModel } from '../../models';

export const CREATE_CLIENT = {
  type: Client,
  args: {
    name: { type: GraphQLString },
    adress: { type: GraphQLString },
    ico: { type: GraphQLString },
  },
  async resolve(_: any, args: any) {
    const { name, adress, ico } = args;

    let client = await ClientModel.findOne({ ico });

    if (!client) {
      client = await new ClientModel({ name, adress, ico }).save();

      return await ClientModel.find();
    }
    throw new Error('Client already exists');
  },
};

export const DELETE_CLIENT = {
  type: Client,
  args: {
    _id: { type: GraphQLID },
  },
  async resolve(_: any, args: any) {
    const { _id } = args;
    await ClientModel.deleteOne({ _id });
  },
};
