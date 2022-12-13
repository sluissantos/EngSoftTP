import database from "../../../database";

async function GetFuncionario(request, response) {
    let results;
    try {
        results = await database("pessoa")
            .join("funcionario", "pessoa.codigo", "funcionario.codigo")
            .leftJoin("medico", "funcionario.codigo", "medico.codigo")
            .select(
                "pessoa.*",
                "funcionario.data_contrato",
                "funcionario.salario",
                "medico.crm",
                "medico.especialidade"
            );
        return response.send(results);
    } catch (error) {
        return response.json({ message: error.message }).send(500);
    }
}

export default GetFuncionario;
