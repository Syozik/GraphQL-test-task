import { ApolloServer } from "apollo-server";
import { resolvers } from "./resolvers/taskResolver";
import { typeDefs } from "./schema/typeDefs";

const server = new ApolloServer({typeDefs, resolvers});
server.listen().then(({ url }) => {
  console.log(`Server is running at ${url}`);
});
