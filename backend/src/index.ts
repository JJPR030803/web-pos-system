// backend/src/index.ts
// backend/src/index.ts
import { Elysia, t } from 'elysia'
import { cors } from '@elysiajs/cors'
import { TAX_RATE } from '@pos/shared' // Importing from your shared folder!
import {greet} from '@pos/shared'

const app = new Elysia().use(cors()).get('/',()=> greet('Backend')).listen(3000)

console.log(`Backend running at ${app.server?.hostname}:${app.server?.port}`)