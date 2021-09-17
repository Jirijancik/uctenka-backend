import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
} from 'graphql';
import { Client, IClient } from '../types/Client';

import { Next, Context } from 'koa';
import { Client as ClientModel } from '../../models';

export async function getUser(ctx: Context, next: Next) {
  const clients = ClientModel.find();

  return (ctx.body = clients);
}

export const GET_ALL_CLIENTS = {
  type: new GraphQLList(Client),
  resolve() {
    return ClientModel.find();
  },
};
