// backend/src/index.ts
// backend/src/index.ts

import { cors } from '@elysiajs/cors';
import { greet } from '@pos/shared';
import { Elysia } from 'elysia';

const app = new Elysia()
  .use(cors())
  .get('/', () => greet('Backend'))
  .listen(3000);

console.log(`Backend running at ${app.server?.hostname}:${app.server?.port}`);
