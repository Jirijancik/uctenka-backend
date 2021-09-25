import { ApolloServer } from 'apollo-server-koa';
import { applyMiddleware } from 'graphql-middleware';
import * as jwt from 'koa-jwt';
import { makeExecutableSchema } from '@graphql-tools/schema';
import permissions from './permissions';
import resolvers from './graphql/resolvers/resolvers';
import typeDefs from './graphql/type_defs/typeDefs';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import * as http from 'http';

import * as Koa from 'koa';
import * as koaBody from 'koa-body';
import * as cors from '@koa/cors';
import * as graphqlHTTP from 'koa-graphql';
import * as Router from 'koa-router';
import * as dotenv from 'dotenv';

async function startApolloServer(typeDefs, resolvers) {
  const httpServer = http.createServer();

  const server = new ApolloServer({
    schema: applyMiddleware(
      makeExecutableSchema({ typeDefs, resolvers }),
      permissions
    ),
    context: ({ req }) => {
      const user = req.user || null;
      return { user };
    },
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();
  const app = new Koa();

  app.use(
    jwt({
      secret: 'SUPER_SECRET',
      algorithms: ['HS256'],
      passthrough: true,
    })
  );

  server.applyMiddleware({ app });

  httpServer.on('request', app.callback());

  await new Promise((resolve: any) =>
    httpServer.listen({ port: 4000 }, resolve)
  );

  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);

  return { server, app };
}
startApolloServer(typeDefs, resolvers);
