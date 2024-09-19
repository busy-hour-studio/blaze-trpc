import '../src';
import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Blaze } from '@busy-hour/blaze';
import { cors } from '@busy-hour/blaze/cors';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const servicePath = path.resolve(__dirname, 'services');

const app = new Blaze({});

await app.load({
  path: servicePath,
  middlewares: [['ALL', cors()]],
});

app.start();

const { router } = app.useTrpc('/trpc/*');

type Router = typeof router;

app.doc('/doc', {
  openapi: '3.0.0',
  info: {
    version: '1.0.0',
    title: 'Blaze OpenAPI Example',
  },
});

const config = app.serve(3000);

const client = createTRPCProxyClient<Router>({
  links: [
    httpBatchLink({
      url: 'http://localhost:3000/trpc',
    }),
  ],
});

client['users.list']
  .query({
    headers: {
      authorization: 'a@a.com',
    },
    query: {},
    body: {},
    params: {},
  })
  .then(console.log);

client['users.create']
  .mutate({
    body: {
      email: 'a@a.com',
      name: 'John Doe',
      password: 'john1',
    },
    query: null,
    headers: null,
    params: null,
  })
  .then(console.log);

export default config;
