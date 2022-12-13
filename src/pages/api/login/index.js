import database from "../../../database";

async function GetLogin(request, response) {
    let model = {
        codigo: "",
        email: "",
        authentication: false,
        isMedico: false,
    };
    let results;
    let selectClause =
        "funcionario.codigo, pessoa.email, if(funcionario.senha_hash = sha1('" +
        request.query.password +
        "'), TRUE, FALSE) as auth";
    let whereClause = "pessoa.email = '" + request.query.email + "'";

    try {
        results = await database("pessoa")
            .join("funcionario", "pessoa.codigo", "funcionario.codigo")
            .select(database.raw(selectClause))
            .whereRaw(whereClause);

        console.log(results[0]);
        if (results[0]) {
            model.codigo = results[0].codigo;
            model.email = results[0].email;
            model.authentication = results[0].auth ? true : false;
        }

        results = await database("medico").where("codigo", model.codigo);
        console.log(results[0]);
        if (model.authentication && results[0]) {
            model.isMedico = true;
        }
    } catch (error) {
        return response.json({ message: error.message }).send(500);
    }

    return response.send(model);
}

export default GetLogin;
