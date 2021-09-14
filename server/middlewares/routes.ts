import * as Router from 'koa-router';
import * as bodyParser from 'koa-bodyparser';
import { api } from '../controllers';

export const createRoutes = () => {
  const router = new Router();
  const baseRouter = new Router();

  router.use(
    bodyParser({
      enableTypes: ['json'],
      strict: true,
    })
  );

  //  CLIENTS
  baseRouter.get('/clients', api.clients.getClients);
  baseRouter.post('/clients', api.clients.createClient);

  // INVOICES
  baseRouter.get('/invoices', api.invoices.createInvoice);
  baseRouter.post('/invoices', api.invoices.createInvoice);

  router.use('/api', baseRouter.routes());

  return router.routes();
};
