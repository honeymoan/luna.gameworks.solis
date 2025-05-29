import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';

import express from 'express';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';

import { typeDefs, resolvers } from './schema.js';

async function apollo() {
    const app = express();
    const httpServer = http.createServer(app);

    const server = new ApolloServer({
        typeDefs,
        resolvers,
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    });

    await server.start();

    app.use(
        '/graphql',
        cors(),
        bodyParser.json(),
        expressMiddleware(server, {}),
    );

    await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
    console.log('🚀 Apollo Server ready at http://localhost:4000/graphql');
}

apollo().catch((error) => {
    console.error('Error starting Apollo Server:', error);
    process.exit(1);
});

// import gql from express-graphql;