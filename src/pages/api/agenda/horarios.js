import database from "../../../database";

async function GetHorarios(request, response) {
    let results;
    let horarios = [
        "07:00:00",
        "08:00:00",
        "09:00:00",
        "10:00:00",
        "11:00:00",
        "12:00:00",
        "13:00:00",
        "14:00:00",
        "15:00:00",
        "16:00:00",
        "17:00:00",
    ];
    try {
        results = await database
            .select("hora")
            .from("agenda")
            .where({
                codigoMedico: request.query.codigomedico,
                data: request.query.data,
            })
            .orderBy("hora", "asc");

        let model = horarios.filter(
            (horario) => !results.map((raw) => raw.hora).includes(horario)
        );

        return response.send(model);
    } catch (error) {
        return response.json({ message: error.message }).send(500);
    }
}

export default GetHorarios;
