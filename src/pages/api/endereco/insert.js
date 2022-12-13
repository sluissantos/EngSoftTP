import database from "../../../database";

async function InsertEndereco(request, response) {
    try {
        if (request.method == "POST") {
            await database("base_de_endereco").insert({
                cep: request.body.cep,
                logradouro: request.body.logradouro,
                bairro: request.body.bairro,
                cidade: request.body.cidade,
                estado: request.body.estado,
            });
        }
        return response.send(201);
    } catch (error) {
        return response.json({ message: error.message }).send(500);
    }
}

export default InsertEndereco;
