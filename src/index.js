import express from 'express';
import { success, error } from 'consola';

import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';

import mongoose from 'mongoose';
import * as AppModels from './models';

import typeDefs from './graphql/typeDefs';
import resolvers from './graphql/resolvers';

import { PORT, DB } from './config';
// Initialize
const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: { ...AppModels },
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

const startApp = async () => {
  try {
    //connect to DB
    await mongoose.connect(DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useUnifiedTopology: false,
    });
    success({ badge: true, message: 'SUCCES CONNECTING TO MONGO' });

    await server.start();
    // Inject Apollo server middleware on Express app
    server.applyMiddleware({ app });
    app.listen(PORT, () =>
      success({ message: 'SERVER STARTED ON PORT 4000', badge: true })
    );
  } catch (error) {
    error({ badge: true, message: error.message });
  }
};

startApp();
