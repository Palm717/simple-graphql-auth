const { ApolloServer } = require("apollo-server");
const typeDefs = require("./typeDefs");
const resolvers = require("./resolvers");

const connectDB = require("./config/db");
const colors = require("colors");

// Connect to DB
connectDB();

// Create ApolloServer instance
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const auth = req.headers.authorization || "";
    return {
      auth,
    };
  },
});

// Start ApolloServer
server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
