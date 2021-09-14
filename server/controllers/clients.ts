import { Next, Context } from 'koa';
import { Client } from '../models';

export async function getClients(ctx: Context, next: Next) {
  const clients = await Client.find();

  return (ctx.body = clients);
}

export async function createClient(ctx: Context, next: Next) {
  const { name, adress, ico } = ctx.request.body;

  if (name && adress && ico) {
    let client = await Client.findOne({ ico });

    if (!client) {
      client = await new Client({ name, adress, ico }).save();

      return (ctx.body = await Client.find());
    } else {
      ctx.status = 400;
      ctx.body = { status: 'error', message: 'ICO already registered' };
    }
  } else {
    ctx.status = 400;
    ctx.body = {
      status: 'error',
      message: `Invalid data, recieved: name-${name}, adress-${adress}, ico-${ico}`,
    };
  }

  return ctx.body;
}
