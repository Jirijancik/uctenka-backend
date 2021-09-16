import * as Koa from 'koa';
import * as koaBody from 'koa-body';
import * as cors from '@koa/cors';
import * as graphqlHTTP from 'koa-graphql';
import * as Router from 'koa-router';

import { connectDatabase } from './db';
import { development, /* test , */ production } from './db/config';

import { config } from './config';
import { createRoutes } from './middlewares/routes';
import { schema } from './graphql';

const databaseConfig =
  process.env.NODE_ENV === 'production' ? development : development;

const app = new Koa();
const router = new Router();

app.use(koaBody());
app.use(cors());
//app.use(createRoutes());

router.all(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.use(router.routes()).use(router.allowedMethods());

//export const server = app.listen(config.port);

(async () => {
  try {
    const info = await connectDatabase(databaseConfig);
    console.log(`Connected to ${info.host}:${info.port}/${info.name}`);
  } catch (error) {
    console.error('Unable to connect to database');
  }

  app.listen(config.port);
  console.log(`Server started on port ${config.port}`);
})();
