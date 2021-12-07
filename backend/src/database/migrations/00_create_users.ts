import { Knex } from 'knex';

export async function up(knex: Knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments('id').primary();
    table.string('name', 100).notNullable();
    table.string('email').unique().notNullable();
    table.string('classification').notNullable();
    table.string('cpf_cnpj').unique();
    table.string('zipcode');
    table.string('state', 2);
    table.string('city');
    table.string('neighborhood');
    table.string('street');
    table.string('number');
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('users');
}
