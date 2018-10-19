exports.up = function(knex, Promise) {
    return knex.schema.createTable('cohorts', tbl => {
       
        tbl.increments('id');
        tbl.string('name', 255).notNullable();
        tbl.string('description', 255);
        tbl.boolean('completed')
    });
  };
  
  exports.down = function(knex, Promise) {
      //Rolls back the table created
    return knex.schema.dropTableIfExists('cohorts');
  };
