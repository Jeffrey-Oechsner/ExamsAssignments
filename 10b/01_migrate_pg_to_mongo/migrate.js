import knex from 'knex';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { MongoClient } from 'mongodb';

// 🛠 Brug korrekt sti til .env når den ligger i ../
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// 🔌 PostgreSQL opsætning
const pg = knex({
  client: 'pg',
  connection: {
    host: process.env.POSTGRES_HOST,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
  },
});

// 🔌 MongoDB opsætning
const mongo = new MongoClient(process.env.MONGO_URI);

// 🔄 Migration funktion
async function migrateUsers() {
  try {
    const users = await pg('users').select('*');
    console.log(`🔁 Migrerer ${users.length} brugere til MongoDB...`);

    // INTEGRATION POINT: Her overføres data fra PostgreSQL til MongoDB
    await mongo.connect();
    const db = mongo.db(); // default DB fra URI (f.eks. "mymongo")
    const result = await db.collection('users').insertMany(users);

    console.log(`✅ Migreret ${result.insertedCount} brugere.`);
  } catch (error) {
    console.error('❌ Migration fejlede:', error);
  } finally {
    await mongo.close();
    await pg.destroy();
  }
}

migrateUsers();
