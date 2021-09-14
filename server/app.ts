import * as Koa from 'koa';
import * as koaBody from 'koa-body';
import * as cors from '@koa/cors';

import { connectDatabase } from './db';
import { development, /* test , */ production } from './db/config';

import { config } from './config';
import { createRoutes } from './middlewares/routes';

const databaseConfig =
  process.env.NODE_ENV === 'production' ? development : development;

const app = new Koa();
app.use(koaBody());
app.use(cors());
app.use(createRoutes());

//export const server = app.listen(config.port);

(async () => {
  try {
    const info = await connectDatabase(databaseConfig);
    console.log(`Connected to ${info.host}:${info.port}/${info.name}`);
  } catch (error) {
    console.error('Unable to connect to database');
  }

  await app.listen(config.port);
  console.log(`Server started on port ${config.port}`);
})();

console.log(`Server running on port xx ${config.port}`);
