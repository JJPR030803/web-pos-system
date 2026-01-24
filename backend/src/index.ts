// backend/src/index.ts
// backend/src/index.ts
import { cors } from '@elysiajs/cors';
import { swagger } from '@elysiajs/swagger';
import { Elysia } from 'elysia';
import { authRoutes } from './routes/auth';

const app = new Elysia()
  .use(cors())
  .use(
    swagger({
      documentation: {
        info: {
          title: 'POS API Documentation',
          version: '1.0.0',
          description: 'API documentation',
        },
      },
    })
  )
  .onError(({ code, error, set }) => {
    if (code === 'VALIDATION') {
      set.status = 422;
      return {
        error: 'Validation failed',
        details: error.message,
      };
    }
    if (code === 'NOT_FOUND') {
      set.status = 404;
      return { error: 'route not found' };
    }

    console.error('Error:', error);
    set.status = 500;
    return { error: 'Internal Server Error' };
  })
  .get('/', () => ({ message: 'POS API' }))
  .get('/health', () => ({ status: 'ok' }))
  .use(authRoutes)
  .listen(3000);

export type App = typeof app;
console.log(`Backend running at ${app.server?.hostname}:${app.server?.port}`);
