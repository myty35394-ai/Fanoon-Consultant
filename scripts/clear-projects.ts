const dotenv = require('dotenv');
dotenv.config({ path: '.env.local' });
const { neon } = require('@neondatabase/serverless');
const { drizzle } = require('drizzle-orm/neon-http');
const { projects } = require('../db/schema');
const db = drizzle(neon(process.env.DATABASE_URL));
async function run() {
  await db.delete(projects);
  console.log('Done clearing projects!');
  process.exit(0);
}
run();
