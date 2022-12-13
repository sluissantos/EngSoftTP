import database from "../../../database";

async function GetEspecialiadade(request, response) {
    let results;
    try {
        results = await database("medico").distinct("especialidade");
        return response.send(results);
    } catch (error) {
        return response.json({ message: error.message }).send(500);
    }
}

export default GetEspecialiadade;
