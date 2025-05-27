import knex from 'knex';
import knexConfig from '../knexfile.js';

// INTEGRATION POINT: Her integreres Knex med applikationen ved at oprette en databaseforbindelse
const db = knex(knexConfig);

db.raw('SELECT 1+1 AS result')
.then((result) => {
    console.log('Database connected successfully', result.rows);
})
.catch((error) => {
    console.error('Database connection failed:', error);
})
.finally(() => {
    db.destroy(); 
});