// backend/src/index.ts
// backend/src/index.ts
import { cors } from '@elysiajs/cors'
import { greet } from '@pos/shared'
import { Elysia } from 'elysia'
import { db } from './db'
import {authRoutes} from "./routes/auth";
import {swagger} from "@elysiajs/swagger";

const app = new Elysia()
    .use(cors())
    .use(swagger({
        documentation:{
            info:{
                title: "POS API Documentation",
                version: "1.0.0",
                description: "API documentation",
            },

        }
    }))
    .get('/', () => ({message: 'POS API'}))
    .get('/health',()=> ({status:'ok'}))
    .use(authRoutes)
    .listen(3000)

export type App = typeof app
console.log(`Backend running at ${app.server?.hostname}:${app.server?.port}`)
