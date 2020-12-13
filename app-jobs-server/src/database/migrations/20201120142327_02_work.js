
exports.up = function(knex) {
    return knex.schema.createTable('work', (table) => {
        table.increments('id').primary()
        table.string('serviceDescription')
        table.integer('from')
        table.integer('to')
        table.boolean('finished')
        table.boolean('reviewed')
        table.float('defined_value_to_pay')
        
        table.integer('babysitter_schedule_id').references('id').inTable('babysitter_schedule')
        table.integer('user_id').references('id').inTable('user')
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('work')
};
