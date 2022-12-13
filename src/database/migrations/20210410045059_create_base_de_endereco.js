exports.up = function (knex) {
    return knex.schema.createTable("base_de_endereco", function (table) {
        table.string("cep").notNullable();
        table.string("logradouro").notNullable();
        table.string("bairro").notNullable();
        table.string("cidade").notNullable();
        table.string("estado").notNullable();
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable("base_de_endereco");
};
