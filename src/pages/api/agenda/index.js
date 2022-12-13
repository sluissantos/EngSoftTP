import database from "../../../database";

async function GetAgenda(request, response) {
    let results;
    try {
        results = await database
            .select(
                "agenda.*",
                "medico.*",
                "pessoa.nome as nomemedico",
                "agenda.codigo as codigo"
            )
            .from("agenda")
            .join("medico", "agenda.codigoMedico", "medico.codigo")
            .join("pessoa", "pessoa.codigo", "medico.codigo");
        return response.send(results);
    } catch (error) {
        return response.json({ message: error.message }).send(500);
    }
}

export default GetAgenda;
