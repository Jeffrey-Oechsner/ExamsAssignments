Opgave 10b - Migration fra PostgreSQL til MongoDB

🚀 Formål

Migrere data fra en relationel database (PostgreSQL) til en NoSQL database (MongoDB) vha. Node.js. Dette viser, hvordan data kan overføres mellem forskellige databasesystemer, som en del af et integrationssystem.

⚙️ Værktøjer

Node.js: JavaScript runtime

Knex.js: Query builder til PostgreSQL

MongoDB Node.js Driver: Til at skrive til MongoDB

Docker: Til at køre PostgreSQL og MongoDB i containere

dotenv: Til at håndtere konfigurationsfiler (.env)

📚 Struktur

10b/
├── 01_migrate_pg_to_mongo/
│   ├── knexfile.js
│   ├── migrate.js
│   ├── migrations/
│   │   └── ... (knex migration files)
│   ├── seeds/
│   │   └── seed_users.js
│   ├── package.json
│   └── docker-compose.yaml
├── .env

📁 .env

# PostgreSQL
POSTGRES_DB=mydatabase
POSTGRES_USER=myuser
POSTGRES_PASSWORD=mypassword
POSTGRES_HOST=postgres

# MongoDB
MONGO_URI=mongodb://mongo:27017/mymongo

Bemærk: .env ligger udenfor 01_migrate_pg_to_mongo, og bliver læst med path.resolve(__dirname, '../.env')

🚫 Start fra bunden

1. Initialiser projekt

npm init -y
npm install knex pg mongodb dotenv

2. Opret docker-compose.yaml

services:
  postgres:
    image: postgres:latest
    env_file:
      - ../.env
    ports:
      - "5432:5432"
    volumes:
      - pg_data:/var/lib/postgresql/data

  mongo:
    image: mongo:latest
    ports:
      - "27017:27017"
    volumes:
      - mongo_data:/data/db

volumes:
  pg_data:
  mongo_data:

3. Start Docker services

docker compose up -d

📂 Knex setup (PG)

Initialiser

npx knex init

Rediger knexfile.js

import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../.env') });

export default {
  client: 'pg',
  connection: {
    database: process.env.POSTGRES_DB,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    host: process.env.POSTGRES_HOST,
  },
  migrations: {
    tableName: 'knex_migrations'
  }
};

📊 Migration + Seed

Opret migration

npx knex migrate:make create_users_table

Eksempel: create_users_table.js

export function up(knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments('id');
    table.string('first_name').notNullable();
    table.string('last_name').notNullable();
  });
}

export function down(knex) {
  return knex.schema.dropTable('users');
}

Kør migration

npx knex migrate:latest

Lav seed fil

npx knex seed:make seed_users

Eksempel: seeds/seed_users.js

export async function seed(knex) {
  await knex('users').del();
  await knex('users').insert([
    { id: 1, first_name: 'John', last_name: 'Doe' },
    { id: 2, first_name: 'Jane', last_name: 'Smith' },
    { id: 3, first_name: 'Alice', last_name: 'Johnson' },
  ]);
}

Kør seed

npx knex seed:run

🚀 migrate.js (PG ➞ Mongo)

import knex from 'knex';
import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const pg = knex({
  client: 'pg',
  connection: {
    host: process.env.POSTGRES_HOST,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
  },
});

const mongo = new MongoClient(process.env.MONGO_URI);

async function migrateUsers() {
  try {
    const users = await pg('users').select('*');
    console.log(`Migrerer ${users.length} brugere til MongoDB...`);

    await mongo.connect();
    const db = mongo.db();
    const result = await db.collection('users').insertMany(users);

    console.log(`✔ Migreret ${result.insertedCount} brugere.`);
  } catch (error) {
    console.error('Migration fejlede:', error);
  } finally {
    await mongo.close();
    await pg.destroy();
  }
}

migrateUsers();

🤔 Bekræftelse

🔢 PostgreSQL

docker exec -it <pg-container-id> psql -U myuser -d mydatabase
SELECT * FROM users;

📃 MongoDB

docker exec -it <mongo-container-id> mongosh
use mymongo
db.users.find().pretty()

🚫 Stop Docker

docker compose down

🏆 Afslutning

Du har nu lavet en komplet datamigration fra en relationel til en NoSQL-database, dokumenteret og klar til genbrug om 2 måneder ✨



