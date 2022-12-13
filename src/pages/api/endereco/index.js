import database from "../../../database";

async function InsertEndereco(request, response) {
    let results;
    try {
        results = await database.select().from("base_de_endereco");
        return response.send(results);
    } catch (error) {
        return response.json({ message: error.message }).send(500);
    }
}

export default InsertEndereco;
