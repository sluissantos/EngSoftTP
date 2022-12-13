exports.up = function (knex) {
    return knex.schema.createTable("medico", function (table) {
        table.string("especialidade").notNullable();
        table.string("crm").notNullable();
        table.integer("codigo").unsigned().primary();
        table.foreign("codigo").references("funcionario.codigo");
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable("medico");
};
