import database from "../../../database";

async function GetAgendamentos(request, response) {
    let results;
    try {
        results = await database
            .select()
            .from("agenda")
            .where("codigoMedico", request.body.codigomedico)
            .orderBy("data", "asc")
            .orderBy("hora", "asc");

        return response.send(results);
    } catch (error) {
        return response.json({ message: error.message }).send(500);
    }
}

export default GetAgendamentos;
