/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("documents", (table)=>{
        table.increments('id').unique()
        table.string("identifier").notNullable()
        table.string('type').notNullable();
        table.string('picute').notNullable();
        table.timestamps(true, true);
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable("documents")
};
