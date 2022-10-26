/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable("users", (table) => {
        table.increments('id').unique()
        table.string("name", 20).notNullable()
        table.string('surname', 20).notNullable();
        table.string('email', 100).notNullable();
        table.string('picture').nullable()
        table.string('password').notNullable();
        table.timestamps(true, true);
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable("users")
};
