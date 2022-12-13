import { DataGrid } from "@material-ui/data-grid";
import { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import { get, post } from "../api-front";

const GenericList = ({ type, medicoCode }) => {
    const [tableRows, setTableRows] = useState([]);

    const parseRows = (rows, type) => {
        console.log(rows);
        return rows.map((row) => {
            return {
                nome: row.nome ? row.nome : "",
                email: row.email ? row.email : "",
                telefone: row.telefone ? row.telefone : "",
                cep: row.cep ? row.cep : "",
                logradouro: row.logradouro ? row.logradouro : "",
                bairro: row.bairro ? row.bairro : "",
                cidade: row.cidade ? row.cidade : "",
                estado: row.estado ? row.estado : "",
                dataInicio: row.data_contrato
                    ? `${new Date(row.data_contrato).getFullYear()}-${new Date(row.data_contrato).getMonth() + 1 < 10
                        ? "0" +
                        (new Date(row.data_contrato).getMonth() + 1)
                        : new Date(row.data_contrato).getMonth() + 1
                    }-${new Date(row.data_contrato).getDate() < 10
                        ? "0" + new Date(row.data_contrato).getDate()
                        : new Date(row.data_contrato).getDate()
                    }`
                    : "",
                salario: row.salario ? row.salario : "",
                id:
                    type !== "endereco"
                        ? row.codigo
                            ? row.codigo
                            : ""
                        : row.cep
                            ? row.cep
                            : "",
                crm: row.crm ? row.crm : "",
                especialidade: row.especialidade ? row.especialidade : "",
                peso: row.peso ? row.peso : "",
                altura: row.altura ? row.altura : "",
                tipoSanguineo: row.tipo_sanguineo ? row.tipo_sanguineo : "",
                medico: row.nomemedico ? row.nomemedico : "",
                dataConsulta: row.data
                    ? `${new Date(row.data).getFullYear()}-${new Date(row.data).getMonth() + 1 < 10
                        ? "0" + (new Date(row.data).getMonth() + 1)
                        : new Date(row.data).getMonth() + 1
                    }-${new Date(row.data).getDate() < 10
                        ? "0" + new Date(row.data).getDate()
                        : new Date(row.data).getDate()
                    }`
                    : "",
                hora: row.hora ? row.hora.slice(0, 5) : "",
            };
        });
    };

    useEffect(() => {
        if (type === "consulta") {
            get("agenda").then((resp) => {
                if (resp) {
                    console.log("GENERIC LIST 1")
                    if (medicoCode) {
                        console.log(medicoCode)
                        let filteredList = resp.filter((user) => user.codigoMedico === medicoCode)
                        console.log(filteredList)
                        setTableRows(parseRows(filteredList, type))
                    } else {
                        setTableRows(parseRows(resp, type))
                    }
                }
            });
        } else
            get(type).then((resp) => {
                if (resp) {
                    console.log("GENERIC LIST 2")
                    console.log(resp)
                    setTableRows(parseRows(resp, type))
                }
            });
    }, []);

    let columns = [];
    switch (type) {
        case "funcionario":
            columns = [
                { field: "nome", headerName: "Nome", flex: 1 },
                { field: "email", headerName: "Email", flex: 1 },
                { field: "telefone", headerName: "Telefone", flex: 1 },
                { field: "cep", headerName: "CEP", flex: 1 },
                { field: "logradouro", headerName: "Logradouro", flex: 1 },
                { field: "bairro", headerName: "Bairro", flex: 1 },
                { field: "cidade", headerName: "Cidade", flex: 1 },
                { field: "estado", headerName: "Estado", flex: 1 },
                { field: "dataInicio", headerName: "Data Inicio", flex: 1 },
                { field: "salario", headerName: "Salario", flex: 1 },
                { field: "crm", headerName: "CRM", flex: 1 },
                {
                    field: "especialidade",
                    headerName: "Especialidade",
                    flex: 1,
                },
            ];
            break;
        case "paciente":
            columns = [
                { field: "nome", headerName: "Nome", flex: 1 },
                { field: "email", headerName: "Email", flex: 1 },
                { field: "telefone", headerName: "Telefone", flex: 1 },
                { field: "cep", headerName: "CEP", flex: 1 },
                { field: "logradouro", headerName: "Logradouro", flex: 1 },
                { field: "bairro", headerName: "Bairro", flex: 1 },
                { field: "cidade", headerName: "Cidade", flex: 1 },
                { field: "estado", headerName: "Estado", flex: 1 },
                { field: "peso", headerName: "Peso", flex: 1 },
                { field: "altura", headerName: "Altura", flex: 1 },
                {
                    field: "tipoSanguineo",
                    headerName: "Tipo Sanguíneo",
                    flex: 1,
                },
            ];
            break;
        case "endereco":
            columns = [
                { field: "cep", headerName: "CEP", flex: 1 },
                { field: "logradouro", headerName: "Logradouro", flex: 1 },
                { field: "bairro", headerName: "Bairro", flex: 1 },
                { field: "cidade", headerName: "Cidade", flex: 1 },
                { field: "estado", headerName: "Estado", flex: 1 },
            ];
            break;
        case "consulta":
        case "consultaMedico":
            columns = [
                {
                    field: "especialidade",
                    headerName: "Especialidade",
                    flex: 1,
                },
                { field: "medico", headerName: "Médico", flex: 1 },
                { field: "dataConsulta", headerName: "Data", flex: 1 },
                { field: "hora", headerName: "Hora", flex: 1 },
                { field: "nome", headerName: "Nome", flex: 1 },
                { field: "email", headerName: "Email", flex: 1 },
                { field: "telefone", headerName: "Telefone", flex: 1 },
            ];
            break;
    }



    return (
        <>
            <h2>{type ? type.toUpperCase() : ""}</h2>
            <div style={{ height: 400, width: "100%" }}>
                <DataGrid rows={tableRows} columns={columns} pageSize={5} />
            </div>
        </>
    );
};

export default GenericList;
