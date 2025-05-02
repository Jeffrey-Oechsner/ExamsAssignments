import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// 🛠 Brug __dirname-agtig metode (i ESM)
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../.env') });

/**
 * @type { import("knex").Knex.Config }
 */
export default {
  client: 'pg',
  connection: {
    database: process.env.POSTGRES_DB,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    host: process.env.POSTGRES_HOST,
  },
  migrations: {
    tableName: 'knex_migrations',
  },
};


