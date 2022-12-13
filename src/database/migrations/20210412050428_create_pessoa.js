exports.up = function (knex) {
    return knex.schema.createTable("pessoa", function (table) {
        table.increments("codigo").primary();
        table.string("nome").notNullable();
        table.string("email").notNullable();
        table.string("telefone").notNullable();
        table.string("cep").notNullable();
        table.string("logradouro").notNullable();
        table.string("bairro").notNullable();
        table.string("cidade").notNullable();
        table.string("estado").notNullable();
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable("pessoa");
};
