export function up(knex) {
    return knex.schema
      .createTable('users', (table) => {
        table.increments('id');
        table.string('first_name', 255).notNullable();
        table.string('last_name', 255).notNullable();
      })
      .createTable('products', (table) => {
        table.increments('id');
        table.decimal('price').notNullable();
        table.string('name', 1000).notNullable();
      });
  }
  
  export function down(knex) {
    return knex.schema
      .dropTable('products')
      .dropTable('users');
  }
  

  //laver file name med timestamp, så kan laver flere med rækkefølge
  // `npx knex migrate:latest` for at oprette tabellerne
  // `npx knex migrate:rollback` for at slette tabellerne