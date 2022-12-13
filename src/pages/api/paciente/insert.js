import database from "../../../database";

async function InsertPaciente(request, response) {
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
                "INSERT INTO paciente values(" +
                request.body.peso +
                "," +
                request.body.altura +
                ",'" +
                request.body.tipo_sanguineo +
                "'," +
                codigo[0].codigo +
                ")";
            await database.raw(insert);
        }

        return response.send(201);
    } catch (error) {
        console.log(error.message);
        response.json({ message: error.message });
    }
}

export default InsertPaciente;
