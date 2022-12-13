exports.up = function (knex) {
    return knex.schema.createTable("agenda", function (table) {
        table.date("data").notNullable();
        table.time("hora").notNullable();
        table.string("nome").notNullable();
        table.string("email").notNullable();
        table.string("telefone").notNullable();
        table.integer("codigo").primary();
        table.integer("codigoMedico").unsigned().notNullable();
        table.foreign("codigoMedico").references("medico.codigo");
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable("agenda");
};
