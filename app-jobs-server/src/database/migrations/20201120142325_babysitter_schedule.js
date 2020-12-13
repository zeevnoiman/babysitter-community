
exports.up = function(knex) {
    return knex.schema.createTable('babysitter_schedule', table => {
        table.increments('id').primary();
        
        table.integer('year').notNullable();
        table.integer('month_day').notNullable();
        table.integer('from').notNullable();
        table.integer('to').notNullable();
        
        table.integer('babysitter_id')
        .notNullable()
        .references('babysitter.id')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('babysitter_schedule')
};
