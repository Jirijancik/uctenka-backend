import { Next, Context } from 'koa';
import { Invoice } from '../models';

export async function getInvoices(ctx: Context, next: Next) {
  const clients = await Invoice.find();

  return (ctx.body = clients);
}

export async function createInvoice(ctx: Context, next: Next) {
  //const { totalPrice, note, supplier } = ctx.request.body;

  const data = { totalPrice: 10, note: 'ahojp', supplier: 'Karel' };
  const { totalPrice, note, supplier } = data;

  if (totalPrice && note && supplier) {
    await new Invoice(data).save();

    return (ctx.body = await Invoice.find());
  } else {
    ctx.status = 400;
    ctx.body = {
      status: 'error',
      message: `Invalid data, recieved: totalPrice-${totalPrice}, note-${note}, supplier-${supplier}`,
    };
  }

  return ctx.body;
}
