import database from "../../../database";

async function InsertAgenda(request, response) {
    try {
        if (request.method == "POST") {
            await database("agenda").insert({
                data: request.body.data,
                hora: request.body.hora,
                nome: request.body.nome,
                email: request.body.email,
                telefone: request.body.telefone,
                codigoMedico: request.body.codigomedico,
            });
        }
        return response.send(201);
    } catch (error) {
        return response.json({ message: error.message }).send(500);
    }
}

export default InsertAgenda;
