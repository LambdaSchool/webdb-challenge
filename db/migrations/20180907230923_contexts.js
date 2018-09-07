exports.up = function(knex, Promise) {
  return knex.schema.createTable("contexts", function(table) {
    table.increments();
    table.string("context", 128).notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("contexts");
};
