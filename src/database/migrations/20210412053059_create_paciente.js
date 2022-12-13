exports.up = function (knex) {
    return knex.schema.createTable("paciente", function (table) {
        table.decimal("peso").notNullable();
        table.decimal("altura").notNullable();
        table.string("tipo_sanguineo").notNullable();
        table.integer("codigo").unsigned().primary();
        table.foreign("codigo").references("pessoa.codigo");
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable("paciente");
};
