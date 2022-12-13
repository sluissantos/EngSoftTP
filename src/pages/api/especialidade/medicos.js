import database from "../../../database";

async function GetMedico(request, response) {
    let results;
    try {
        results = await database("medico")
            .join("pessoa", "medico.codigo", "pessoa.codigo")
            .select("nome", "medico.codigo")
            .where("medico.especialidade", request.query.especialidade);

        return response.send(results);
    } catch (error) {
        return response.json({ message: error.message }).send(500);
    }
}

export default GetMedico;
