import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
} from 'graphql';
import { Client, IClient } from '../type_defs/Client';

import { Next, Context } from 'koa';
import { Client as ClientModel } from '../../models';

export async function getClients(ctx: Context, next: Next) {
  const clients = ClientModel.find();

  return (ctx.body = clients);
}

export const GET_ALL_CLIENTS = {
  type: new GraphQLList(Client),
  resolve() {
    return ClientModel.find();
  },
};
