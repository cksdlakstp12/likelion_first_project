import { GraphQLServer } from "graphql-yoga";
import logger from "morgan";
import "@babel/polyfill";
import schema from "./schema";
import "./env";
import { isAuthenticated } from "./middleware";

const PORT = process.env.PORT;

const server = new GraphQLServer({
  schema,
  context: ({ request }) => ({ request, isAuthenticated }),
});

server.express.use(logger("dev"));

server.start({ port: PORT }, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);