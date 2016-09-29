import path from 'path';
import express from 'express';
import graphQLHTTP from 'express-graphql';
import { schema } from './schema/schema';
import cors from 'cors';

const SERVER_PORT = process.env.PORT || 8080;
const SERVER_HOST = process.env.HOST || 'localhost';
 const IS_DEVELOPMENT = process.env.NODE_ENV !== 'production';
function getSchema() {
  if (!IS_DEVELOPMENT) {
    return schema;
  }

  delete require.cache[require.resolve('./schema/schema.js')];
  return require('./schema/schema.js').schema;
}

const server = express();
// CORS
server.use(cors());

 
server.use(
  '/graphql',
  graphQLHTTP((request) => {
    return {
      graphiql: IS_DEVELOPMENT,
      pretty: IS_DEVELOPMENT,
      schema: getSchema(),
    };
  })
);

server.use('/', (req, res) => res.redirect('/graphql'));

server.listen(SERVER_PORT, () => console.log(
  `Server is now running in ${process.env.NODE_ENV || 'development'} mode on http://localhost:${SERVER_PORT}`
));

 
