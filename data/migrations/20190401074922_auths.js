
exports.up = function(knex) {
  return knex.schema.createTable('users', function(tbl){
      tbl.increments()
      tbl.string('username', 100).notNullable().unique();
      tbl.string('password', 255).notNullable();
  })
};

exports.down = function(knex) {
  return knex.schema
};
