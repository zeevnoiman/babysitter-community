
exports.up = function(knex) {
    return knex.schema.createTable('babysitter', (table) => {
        table.increments('id').primary()
        table.string('name')
        table.integer('age')
        table.enu('gender', ['male', 'female'], { useNative: true, existingType: true, enumName: 'gender' })
        table.string('email')
        table.string('city')
        table.string('street')
        table.specificType("location", "geometry(point, 4326)");
        table.string('bio')
        table.string('photo')
        table.string('phone')
        table.text('languages')
        table.float('rate')   
        table.float('stars')   
        table.integer('howManyReviews')      
        
        table.integer('user_id')
            .references('id')
            .inTable('user')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('babysitter')
};
