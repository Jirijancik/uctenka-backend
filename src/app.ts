import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import { ApolloServer } from 'apollo-server-express';
import consola from 'consola';
import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import { join } from 'path';
import { DB, IN_PROD, PORT } from './config';
import resolvers from './graphql/resolvers';
import typeDefs from './graphql/typeDefs';
import AuthMiddleware from './middlewares/auth';
// import { schemaDirectives } from './graphql/directives';
import appModels from './models';

const app = express();
// Remove x-powered-by header
app.disable('x-powered-by');
app.use(AuthMiddleware);
app.use(express.json());
app.use(cors());

// Set Express Static Directory
app.use(express.static(join(__dirname, './uploads')));

// Define the Apollo-Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  // schemaDirectives,
  playground: !IN_PROD,
  context: ({ req }) => {
    const { user, isAuth } = req;

    return {
      req,
      user,
      isAuth,
      ...appModels,
    };
  },
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
} as any);

// Function to start express and apollo server
const startApp = async () => {
  try {
    // Connect With MongoDB Database
    await mongoose.connect(DB, {});
    consola.success({
      badge: true,
      message: `Successfully connected with the database ${DB}`,
    });

    // Start server
    await server.start();

    // Apply Apollo-Express-Server Middlware to express application
    server.applyMiddleware({
      app,
      cors: true,
    });

    // Start Listening on the Server
    app.listen(PORT, () =>
      consola.success({
        badge: true,
        message: `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`,
      }),
    );

    //generateData()
  } catch (err) {
    consola.error({
      badge: true,
      message: err.message,
    });
  }
};

// Invoke Start Application Function
startApp();
