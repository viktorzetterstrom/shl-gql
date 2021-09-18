import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import { buildSchema } from "type-graphql";
import { TodoResolver } from "./resolvers/todo-resolver";

const main = async () => {
  const schema = await buildSchema({
    resolvers: [TodoResolver],
    emitSchemaFile: true,
  });

  const app = express();

  const server = new ApolloServer({ schema });
  await server.start();

  server.applyMiddleware({ app });

  app.listen(4000, () => console.log("shl-gql live on port 4000"));
};

main();
