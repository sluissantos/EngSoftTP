import database from "../../../database";

async function InsertFuncionario(request, response) {
    try {
        if (request.method == "POST") {
            await database("pessoa").insert({
                bairro: request.body.bairro,
                cep: request.body.cep,
                cidade: request.body.cidade,
                codigo: request.body.codigo,
                email: request.body.email,
                estado: request.body.estado,
                logradouro: request.body.logradouro,
                nome: request.body.nome,
                telefone: request.body.telefone,
            });

            let codigo = await database("pessoa").max("codigo as codigo");

            let insert =
                "INSERT INTO funcionario values('" +
                request.body.data_contrato +
                "'," +
                request.body.salario +
                ", sha1('" +
                request.body.senha_hash +
                "')," +
                codigo[0].codigo +
                ")";
            await database.raw(insert);

            if (request.body.isMedico) {
                await database("medico").insert({
                    codigo: codigo[0].codigo,
                    crm: request.body.crm,
                    especialidade: request.body.especialidade,
                });
            }
        }

        return response.send(201);
    } catch (error) {
        console.log(error.message);
        response.json({ message: error.message });
    }
}

export default InsertFuncionario;
