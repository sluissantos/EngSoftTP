import database from "../../../database";

async function InsertEndereco(request, response) {
    let results;
    try {
        results = await database("base_de_endereco").where(
            "cep",
            request.query.id
        );
        return response.send(results);
    } catch (error) {
        return response.json({ message: error.message }).send(500);
    }
}

export default InsertEndereco;
