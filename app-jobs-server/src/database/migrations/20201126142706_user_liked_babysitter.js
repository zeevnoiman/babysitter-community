
exports.up = function(knex) {
    return knex.schema.createTable('liked_babysitters', (table) => {
        table.integer('user_id')
            .references('user.id')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');

        table.integer('babysitter_id')
            .references('babysitter.id')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');

        table.primary(['user_id', 'babysitter_id']);
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('liked_babysitters')
};
