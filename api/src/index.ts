import * as dotenv from "dotenv";
dotenv.config();

import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";

import { Shl } from "./data-sources";
import {
  ArticlesResolver,
  GamesResolver,
  GoaliesResolver,
  SkatersResolver,
  StandingsResolver,
  TeamsResolver,
  VideosResolver,
  GameDaysResolver,
} from "./resolvers";

export interface Context {
  dataSources: {
    shl: Shl;
  };
}

const main = async () => {
  const schema = await buildSchema({
    resolvers: [
      ArticlesResolver,
      GamesResolver,
      GoaliesResolver,
      SkatersResolver,
      StandingsResolver,
      TeamsResolver,
      VideosResolver,
      GameDaysResolver,
    ],
    emitSchemaFile: true,
  });

  const app = express();

  const shl = new Shl(
    process.env.SHL_ID as string,
    process.env.SHL_SECRET as string
  );

  const server = new ApolloServer({
    schema,
    dataSources: () => ({ shl }),
  });
  await server.start();

  server.applyMiddleware({ app });

  app.listen(4001, () => console.log("shl-gql live on port 4001"));
};

main();
