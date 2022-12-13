exports.up = function (knex) {
    return knex.schema.createTable("funcionario", function (table) {
        table.datetime("data_contrato").notNullable();
        table.decimal("salario").notNullable();
        table.string("senha_hash").notNullable();
        table.integer("codigo").unsigned().primary();
        table.foreign("codigo").references("pessoa.codigo");
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable("funcionario");
};
