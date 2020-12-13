
exports.up = function(knex) {
    return knex.schema.createTable('user', (table) => {
        table.increments('id').primary()
        table.string('name')
        table.string('email')
        table.string('password')
        table.enu('role', ['Family', 'Nanny'], { useNative: true, existingType: true, enumName: 'role_type' })
        table.string('expoPushToken')
            
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('user')
};
