import database from "../../../database";

async function GetPaciente(request, response) {
    let results;
    try {
        results = await database("pessoa")
            .join("paciente", "pessoa.codigo", "paciente.codigo")
            .select();
        return response.send(results);
    } catch (error) {
        return response.json({ message: error.message }).send(500);
    }
}

export default GetPaciente;
