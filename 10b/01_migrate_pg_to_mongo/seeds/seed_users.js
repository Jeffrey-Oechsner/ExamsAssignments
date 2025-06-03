/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Slet eksisterende data
  await knex('users').del();

  // Indsæt nye brugere
  await knex('users').insert([
    { id: 1, first_name: 'John', last_name: 'Doe' },
    { id: 2, first_name: 'Jane', last_name: 'Smith' },
    { id: 3, first_name: 'Alice', last_name: 'Johnson' },
  ]);
}

// `npx knex seed:run` sletter users data i tabellen og indsætter nye users data.