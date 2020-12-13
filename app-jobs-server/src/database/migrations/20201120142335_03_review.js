
exports.up = function(knex) {
    return knex.schema.createTable('review', (table) => {
        table.increments('id').primary();

        table.string('message').notNullable();
        table.float('stars').notNullable();
        table.integer('from').notNullable();
        table.integer('to').notNullable();
        
        table.integer('work_id')
            .references('work.id')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('review')
};
