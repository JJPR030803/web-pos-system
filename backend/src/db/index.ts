import { drizzle } from 'drizzle-orm/postgres-js'
// @ts-ignore
import postgres from 'postgres'
import * as schema from './schema'

const connectionString = process.env.DATABASE_URL ||
    'postgresql://pos_user:pos_password@localhost:5432/pos_dev'

const client = postgres(connectionString)
export const db = drizzle(client, { schema })