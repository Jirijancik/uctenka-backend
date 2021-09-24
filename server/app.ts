import { ApolloServer } from 'apollo-server-koa';
import { applyMiddleware } from 'graphql-middleware';
import * as jwt from 'koa-jwt';
import { makeExecutableSchema } from '@graphql-tools/schema';
import permissions from './permissions';
import resolvers from './graphql/resolvers/resolvers';
import typeDefs from './graphql/type_defs/typeDefs';

import * as Koa from 'koa';
import * as koaBody from 'koa-body';
import * as cors from '@koa/cors';
import * as graphqlHTTP from 'koa-graphql';
import * as Router from 'koa-router';
import * as dotenv from 'dotenv';

const port = 4000;
const app = new Koa();

app.use(
  jwt({
    secret: 'SUPER_SECRET',
    algorithms: ['HS256'],
    //  credentialsRequired: false,
  })
);

const server = new ApolloServer({
  schema: applyMiddleware(
    makeExecutableSchema({ typeDefs, resolvers }),
    permissions
  ),
  context: ({ req }) => {
    const user = req.user || null;
    return { user };
  },
});

server.applyMiddleware({ app });

app.listen({ port }, () => {
  console.log(`Server ready at http://localhost:${port}${server.graphqlPath}`);
});

// import * as Koa from 'koa';
// import * as koaBody from 'koa-body';
// import * as cors from '@koa/cors';
// import * as graphqlHTTP from 'koa-graphql';
// import * as Router from 'koa-router';
// import * as dotenv from 'dotenv';
// import { ApolloServer } from 'apollo-server-koa';

// import * as jwt from 'jsonwebtoken';

// import { connectDatabase } from './db';

// import { config } from './config';
// //import { createRoutes } from './middlewares/routes';
// import { schema } from './graphql';

// const corsOptions = {
//   origin: 'http://localhost:3000',
//   credentials: true,
// };

// const app = new Koa();
// const router = new Router();

// dotenv.config();

// app.use(koaBody());
// app.use(cors(corsOptions));

// // router.all(
// //   '/graphql',
// //   graphqlHTTP({
// //     schema,
// //     graphiql: true,
// //     context,
// //   })
// // );

// app.use(router.routes()).use(router.allowedMethods());

// const context = ({ req }: any) => {
//   const token = req.cookies['jwt'] || '';
//   try {
//     return ({ id, email } = jwt.verify(token, SECRET_KEY));
//   } catch (e) {
//     throw new AuthenticationError(
//       'Authentication token is invalid, please log in'
//     );
//   }
// };

// const server = new ApolloServer({
//   typedefs,
//   resolvers,
//   context,
// });
// server.applyMiddleware({ app });

// //app.use(createRoutes());

// //export const server = app.listen(config.port);

// (async () => {
//   try {
//     const info = await connectDatabase(process.env.DB_CONNECT);
//     console.log(`Connected to ${info.host}:${info.port}/${info.name}`);
//   } catch (error) {
//     console.error(
//       'Unable to connect to database, uri: ',
//       process.env.DB_CONNECT
//     );
//   }

//   app.listen(config.port);
//   console.log(`Server started on port ${config.port}`);
// })();
