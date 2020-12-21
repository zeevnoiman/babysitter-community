
exports.up = function(knex) {
    return knex.schema.createTable('review', (table) => {
        table.increments('id').primary();

        table.string('message').notNullable();
        table.float('stars').notNullable();
        
        table.integer('work_id')
            .references('id')
            .inTable('work')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('review')
};
