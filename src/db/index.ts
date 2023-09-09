import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import * as schema from './schema';

const connectionString = process.env.DATABASE_URL || '';
const client = postgres(connectionString);
const db = drizzle(client, { schema: schema });

export { users, posts } from './schema';
export default db;
