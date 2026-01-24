import type { Config } from 'drizzle-kit';

export default {
  schema: './src/db/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    host: 'localhost',
    user: 'pos_user',
    port: 5432,
    password: '030803',
    database: 'pos_dev',
  },
} satisfies Config;
