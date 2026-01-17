// backend/src/index.ts
// backend/src/index.ts
import { cors } from '@elysiajs/cors'
import { greet } from '@pos/shared'
import { Elysia } from 'elysia'
import { db } from './db'
import {authRoutes} from "./routes/auth";

const app = new Elysia()
    .use(cors())
    .get('/', () => ({message: 'POS API'}))
    .get('/health',()=> ({status:'ok'}))
    .use(authRoutes)
    .listen(3000)
console.log(`Backend running at ${app.server?.hostname}:${app.server?.port}`)
