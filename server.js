const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const { typeDefs } = require('./schema');
const { resolvers } = require('./resolvers');

let serverInstance = null;

async function startServer() {
  if (serverInstance) {
    return serverInstance.url;
  }

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });

  serverInstance = { url };
  return url;
}

module.exports = { startServer };
