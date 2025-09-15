import 'dotenv/config';
import { ApolloServer } from '@apollo/server';
import express, { Request, Response } from 'express';
import http from 'http';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { expressMiddleware } from '@as-integrations/express5';

import typeDefs from './graphql/typeDefs';
import resolvers from './graphql/resolvers';

const app = express();

app.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({ status: 'ok' });
});

const httpServer = http.createServer(app);

const schema = makeExecutableSchema({
  typeDefs: [typeDefs],
  resolvers,
});

async function start(): Promise<void> {
  const server = new ApolloServer({
    schema,
  });
  await server.start();

  app.use('/graphql', express.json(), expressMiddleware(server));

  await new Promise<void>((resolve) => httpServer.listen({ port: 4000 }, resolve));
  console.log('🚀  Server ready at: http://localhost:4000/graphql');
}

start();
