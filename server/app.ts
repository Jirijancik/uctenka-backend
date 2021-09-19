import * as Koa from 'koa';
import * as koaBody from 'koa-body';
import * as cors from '@koa/cors';
import * as graphqlHTTP from 'koa-graphql';
import * as Router from 'koa-router';
import * as dotenv from 'dotenv';

import * as jwt from 'jsonwebtoken';

import { connectDatabase } from './db';

import { config } from './config';
//import { createRoutes } from './middlewares/routes';
import { schema } from './graphql';

const app = new Koa();
const router = new Router();

dotenv.config();

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
    const info = await connectDatabase(process.env.DB_CONNECT);
    console.log(`Connected to ${info.host}:${info.port}/${info.name}`);
  } catch (error) {
    console.error(
      'Unable to connect to database, uri: ',
      process.env.DB_CONNECT
    );
  }

  app.listen(config.port);
  console.log(`Server started on port ${config.port}`);
})();
