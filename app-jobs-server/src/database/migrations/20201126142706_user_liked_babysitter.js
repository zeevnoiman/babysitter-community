
exports.up = function(knex) {
    return knex.schema.createTable('liked_babysitters', (table) => {
        table.integer('user_id')
            .references('id')
            .inTable('user')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');

        table.integer('babysitter_id')
            .references('id')
            .inTable('babysitter')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');

        table.primary(['user_id', 'babysitter_id']);
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('liked_babysitters')
};
