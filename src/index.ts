import dotenv from "dotenv";
dotenv.config();
import config from "config";
import {
  ApolloServerPluginLandingPageGraphQLPlayground,
  ApolloServerPluginLandingPageProductionDefault,
} from "apollo-server-core";
import { ApolloServer } from "apollo-server-express";
import cookieParser from "cookie-parser";
import express from "express";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { connectToMongo } from "../utils/mongo";
import { resolvers } from "./resolvers";
import { verifyJwt } from "../utils/jwt";
import { User } from "./schema/user.schema.ts";
import { Context } from "./types/context";
import { authChecker } from "../utils/authChecker";
import consola from "consola";
import session from "express-session";
import connectRedis from "connect-redis";
import { redis } from "./redis";

async function bootstrap() {
  const corsOptions = {
    origin: "http://localhost:3000",
    credentials: true,
  };

  try {
    //build the schema
    const schema = await buildSchema({
      resolvers,
      authChecker,
    });
    //init express
    const app = express();

    app.use(cookieParser());

    const RedisStore = connectRedis(session);

    app.use(
      session({
        store: new RedisStore({
          client: redis,
        }),
        name: "qid",
        secret: config.get<string>("SESSION_SECRET"),
        resave: false,
        saveUninitialized: false,
        cookie: {
          httpOnly: false,
          secure: config.get<string>("NODE_ENV") === "production",
          maxAge: 1000 * 60 * 60 * 24 * 5, // 5 days
        },
      })
    );

    // app.use(
    //   session({
    //     secret: config.get<string>("SESSION_SECRET"),
    //     resave: false,
    //     saveUninitialized: false,
    //   })
    // );

    //create apollo server
    const server = new ApolloServer({
      schema,
      context: (ctx: Context) => {
        const context = ctx;

        if (ctx.req.cookies.accessToken) {
          const user = verifyJwt<User>(ctx.req.cookies.accessToken);

          context.user = user;
        }
        return ctx;
      },
      plugins: [
        process.env.NODE_ENV === "production"
          ? ApolloServerPluginLandingPageProductionDefault()
          : ApolloServerPluginLandingPageGraphQLPlayground(),
      ],
    });

    //waait  server start
    await server.start();
    // apply middlewares
    server.applyMiddleware({ app, cors: corsOptions });
    // listen ton express server

    // Start Listening on the Server
    app.listen(config.get<string>("PORT"), () =>
      consola.success({
        badge: true,
        message: `🚀 Server ready at http://localhost:${config.get<string>(
          "PORT"
        )}${server.graphqlPath}`,
      })
    );

    //connect to DB
    connectToMongo();
  } catch (error) {
    consola.error({
      badge: true,
      message: (error as Error).message,
    });
  }
}

bootstrap();
