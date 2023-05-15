import { Session } from "./utils/types";
import { PrismaClient } from "@prisma/client";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import express from "express";
import http from "http";
import cors from "cors";
import { json } from "body-parser";
import { makeExecutableSchema } from "@graphql-tools/schema";
import * as dotenv from "dotenv";
import { getSession } from "next-auth/react";

import typeDefs from "./graphql/typeDefs";
import resolvers from "./graphql/resolvers";
import { GraphQLContext } from "./utils/types";

const main = async () => {
  dotenv.config();

  const app = express();
  const httpServer = http.createServer(app);

  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });

  const prisma = new PrismaClient();

  const server = new ApolloServer({
    schema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  
  await server.start();

  const corsOptions = {
    origin: process.env.BASE_URL,
    credentials: true,
  };

  app.use(
    "/graphql",
    cors<cors.CorsRequest>(corsOptions),
    json(),
    expressMiddleware(server, {
      context: async ({ req }): Promise<GraphQLContext> => {
        const session = (await getSession({ req })) as Session;
        return { session, prisma };
      },
    })
  );

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 4000 }, resolve)
  );
  console.log(`🚀 Server ready at http://localhost:4000/graphql`);
};

main().catch((err) => console.log(err));
