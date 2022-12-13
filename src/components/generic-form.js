import { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import DateFnsUtils from "@date-io/date-fns";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import Switch from "@material-ui/core/Switch";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { post, get } from "../api-front";
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from "@material-ui/pickers";
import React from "react";
import { defaultStyles, form } from "../styles";
import MySnackBar from "../components/snackBar";
import { snackBarSeverity } from "../helper";

const GenericForm = ({ type }) => {
    // type: "funcionario", "medico", "paciente"
    const formStyle = form();

    const [snackBarMessage, setSnackBarMessage] = useState("");
    const [isOpenSnackBar, setIsOpenSnackBar] = useState(false);
    const [severitySnackBar, setSeveritySnackBar] = useState(
        snackBarSeverity.SUCCESS
    );

    const setSuccessSnackBar = () => {
        setSnackBarMessage("Sucesso");
        setSeveritySnackBar(snackBarSeverity.SUCCESS);
        setIsOpenSnackBar(true);
    };

    const setErrorSnackbar = () => {
        setSnackBarMessage("Ocorreu um erro!");
        setSeveritySnackBar(snackBarSeverity.ERROR);
        setIsOpenSnackBar(true);
    };

    const handleSendClick = async () => {
        try {
            switch (type) {
                case "medico":
                case "funcionario":
                    await post("funcionario", {
                        bairro: formBairro,
                        cep: formCep,
                        cidade: formCidade,
                        email: formEmail,
                        estado: formEstado,
                        logradouro: formLogradouro,
                        nome: formNome,
                        telefone: formTelefone,
                        data_contrato: `${formDataInicio.getFullYear()}-${
                            formDataInicio.getMonth() + 1 < 10
                                ? "0" + (formDataInicio.getMonth() + 1)
                                : formDataInicio.getMonth() + 1
                        }-${
                            formDataInicio.getDate() < 10
                                ? "0" + formDataInicio.getDate()
                                : formDataInicio.getDate()
                        }`,
                        salario: formSalario,
                        senha_hash: formSenha,
                        crm: formCrm,
                        especialidade: formEspecialidade,
                        isMedico: isMedico,
                    })
                        .then(() => setSuccessSnackBar())
                        .catch((error) => {
                            setErrorSnackbar();
                        });
                    break;
                case "paciente":
                    await post("paciente", {
                        bairro: formBairro,
                        cep: formCep,
                        cidade: formCidade,
                        email: formEmail,
                        estado: formEstado,
                        logradouro: formLogradouro,
                        nome: formNome,
                        telefone: formTelefone,
                        peso: formPeso,
                        altura: formAltura.replace(",", "."),
                        tipo_sanguineo: formTipoSanguineo,
                    })
                        .then(() => setSuccessSnackBar())
                        .catch((error) => {
                            setErrorSnackbar();
                        });
                    break;
                case "endereco":
                    await post("endereco", {
                        bairro: formBairro,
                        cep: formCep,
                        cidade: formCidade,
                        estado: formEstado,
                        logradouro: formLogradouro,
                    })
                        .then(() => setSuccessSnackBar())
                        .catch((error) => {
                            setErrorSnackbar();
                        });
                    break;
                case "consulta":
                    await post("agenda", {
                        data: `${formDataConsulta.getFullYear()}-${
                            formDataConsulta.getMonth() + 1 < 10
                                ? "0" + (formDataConsulta.getMonth() + 1)
                                : formDataConsulta.getMonth() + 1
                        }-${
                            formDataConsulta.getDate() < 10
                                ? "0" + formDataConsulta.getDate()
                                : formDataConsulta.getDate()
                        }`,
                        hora: formHoraConsulta,
                        nome: formNome,
                        email: formEmail,
                        telefone: formTelefone,
                        codigomedico: formMedico,
                    })
                        .then(() => setSuccessSnackBar())
                        .catch((error) => {
                            setErrorSnackbar();
                        });
                    break;
                default:
                    break;
            }
        } catch (ex) {
            setErrorSnackbar();
        }
    };

    const handleSetFormCep = (value) => {
        setFormCep(value);
        if (value && value.replace("-", "").length === 8) {
            get(`endereco/${value.replace("-", "")}`).then((result) => {
                if (result && result[0]) {
                    console.log(result);
                    setFormLogradouro(result[0].logradouro);
                    setFormBairro(result[0].bairro);
                    setFormCidade(result[0].cidade);
                    setFormEstado(result[0].estado);
                }
            });
        }
    };

    const handleSetIsMedico = (value) => {
        setIsMedico(value);
    };

    const handleSetFormSelectEspecialidade = (value) => {
        setFormSelectEspecialidade(value);
        get("especialidade/medicos", { especialidade: value }).then(
            (result) => {
                setOptionsMedico(result);
            }
        );
    };

    const handleSetFormDataConsulta = (value) => {
        setFormDataConsulta(value);
        get("agenda/horarios", {
            codigomedico: formMedico,
            data: `${value.getFullYear()}-${
                value.getMonth() + 1 < 10
                    ? "0" + (value.getMonth() + 1)
                    : value.getMonth() + 1
            }-${
                value.getDate() < 10 ? "0" + value.getDate() : value.getDate()
            }`,
        }).then((result) =>
            setOptionsHour(result.map((value) => value.slice(0, 5)))
        );
        // busca no back as options
    };

    // states
    const [formMedico, setFormMedico] = useState("");
    const [formSelectEspecialidade, setFormSelectEspecialidade] = useState("");
    const [formDataConsulta, setFormDataConsulta] = useState(new Date());
    const [formHoraConsulta, setFormHoraConsulta] = useState("");
    const [formNome, setFormNome] = useState("");
    const [formEmail, setFormEmail] = useState("");
    const [formTelefone, setFormTelefone] = useState("");
    const [formCep, setFormCep] = useState("");
    const [formLogradouro, setFormLogradouro] = useState("");
    const [formBairro, setFormBairro] = useState("");
    const [formCidade, setFormCidade] = useState("");
    const [formEstado, setFormEstado] = useState("");
    const [formDataInicio, setFormDataInicio] = useState(new Date());
    const [formSalario, setFormSalario] = useState("");
    const [formSenha, setFormSenha] = useState("");
    const [formEspecialidade, setFormEspecialidade] = useState("");
    const [formCrm, setFormCrm] = useState("");
    const [formPeso, setFormPeso] = useState("");
    const [formAltura, setFormAltura] = useState("");
    const [formTipoSanguineo, setFormTipoSanguineo] = useState("");
    const [optionsEspecialidade, setOptionsEspecialidade] = useState([]);
    const [optionsMedico, setOptionsMedico] = useState([]);
    const [optionsHour, setOptionsHour] = useState([]);
    const [isMedico, setIsMedico] = useState(false);

    useEffect(() => {
        get("especialidade").then((result) => setOptionsEspecialidade(result));
    }, []);

    return (
        <>
            <div className={formStyle.default}>
                <div className={formStyle.box}>
                    {["consulta"].includes(type) && (
                        <div className={formStyle.item}>
                            <FormControl className={formStyle.item}>
                                <InputLabel
                                    style={{ marginLeft: "15px" }}
                                    className={formStyle.item}
                                >
                                    Especialidade
                                </InputLabel>
                                <Select
                                    className={formStyle.item}
                                    label="Especialidade"
                                    id="demo-simple-select"
                                    value={formSelectEspecialidade}
                                    onChange={(ev) => {
                                        handleSetFormSelectEspecialidade(
                                            ev.target.value
                                        );
                                    }}
                                >
                                    {optionsEspecialidade.map((option) => (
                                        <MenuItem
                                            id={option.especialidade}
                                            value={option.especialidade}
                                        >
                                            {option.especialidade}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </div>
                    )}
                    {["consulta"].includes(type) && (
                        <div className={formStyle.item}>
                            <FormControl className={formStyle.item}>
                                <InputLabel className={formStyle.item}>
                                    Médico
                                </InputLabel>
                                <Select
                                    className={formStyle.item}
                                    label="Medico"
                                    id="demo-simple-select"
                                    value={formMedico}
                                    onChange={(ev) => {
                                        setFormMedico(ev.target.value);
                                    }}
                                >
                                    {optionsMedico.map((option) => (
                                        <MenuItem
                                            id={option.nome}
                                            value={option.codigo}
                                        >
                                            {option.nome}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </div>
                    )}
                    {["consulta"].includes(type) && (
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                                style={{
                                    marginBottom: "45px",
                                    marginLeft: "20px",
                                }}
                                disableToolbar
                                variant="outlined"
                                format="dd/MM/yyyy"
                                id="date-picker-inline"
                                label="Data da Consulta"
                                value={formDataConsulta}
                                onChange={(ev) => {
                                    handleSetFormDataConsulta(ev);
                                }}
                            />
                        </MuiPickersUtilsProvider>
                    )}
                    {["consulta"].includes(type) && (
                        <div className={formStyle.item}>
                            <FormControl className={formStyle.item}>
                                <InputLabel
                                    style={{ marginLeft: "15px" }}
                                    className={formStyle.item}
                                >
                                    Hora
                                </InputLabel>
                                <Select
                                    className={formStyle.item}
                                    label="Hora"
                                    id="demo-simple-select"
                                    value={formHoraConsulta}
                                    onChange={(ev) => {
                                        setFormHoraConsulta(ev.target.value);
                                    }}
                                >
                                    {optionsHour.map((option) => (
                                        <MenuItem id={option} value={option}>
                                            {option}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </div>
                    )}
                    {["funcionario", "medico", "paciente", "consulta"].includes(
                        type
                    ) && (
                        <div className={formStyle.item}>
                            <TextField
                                className={formStyle.item}
                                id="outlined-basic"
                                label="Nome"
                                variant="outlined"
                                value={formNome}
                                onChange={(ev) => {
                                    setFormNome(ev.target.value);
                                }}
                            />
                        </div>
                    )}
                    {["funcionario", "medico", "paciente", "consulta"].includes(
                        type
                    ) && (
                        <div className={formStyle.item}>
                            <TextField
                                className={formStyle.item}
                                id="outlined-basic"
                                label="Email"
                                variant="outlined"
                                value={formEmail}
                                onChange={(ev) => {
                                    setFormEmail(ev.target.value);
                                }}
                            />
                        </div>
                    )}
                    {["funcionario", "medico", "paciente", "consulta"].includes(
                        type
                    ) && (
                        <div className={formStyle.item}>
                            <TextField
                                className={formStyle.item}
                                id="outlined-basic"
                                label="Telefone"
                                variant="outlined"
                                value={formTelefone}
                                onChange={(ev) => {
                                    setFormTelefone(ev.target.value);
                                }}
                            />
                        </div>
                    )}
                    {["funcionario", "medico", "paciente", "endereco"].includes(
                        type
                    ) && (
                        <div className={formStyle.item}>
                            <TextField
                                className={formStyle.item}
                                id="outlined-basic"
                                label="CEP"
                                variant="outlined"
                                value={formCep}
                                onChange={(ev) => {
                                    handleSetFormCep(ev.target.value);
                                }}
                            />
                        </div>
                    )}
                    {["funcionario", "medico", "paciente", "endereco"].includes(
                        type
                    ) && (
                        <div className={formStyle.item}>
                            <TextField
                                className={formStyle.item}
                                id="outlined-basic"
                                label="Logradouro"
                                variant="outlined"
                                value={formLogradouro}
                                onChange={(ev) => {
                                    setFormLogradouro(ev.target.value);
                                }}
                            />
                        </div>
                    )}
                    {["funcionario", "medico", "paciente", "endereco"].includes(
                        type
                    ) && (
                        <div className={formStyle.item}>
                            <TextField
                                className={formStyle.item}
                                id="outlined-basic"
                                label="Bairro"
                                variant="outlined"
                                value={formBairro}
                                onChange={(ev) => {
                                    setFormBairro(ev.target.value);
                                }}
                            />
                        </div>
                    )}
                    {["funcionario", "medico", "paciente", "endereco"].includes(
                        type
                    ) && (
                        <div className={formStyle.item}>
                            <TextField
                                className={formStyle.item}
                                id="outlined-basic"
                                label="Cidade"
                                variant="outlined"
                                value={formCidade}
                                onChange={(ev) => {
                                    setFormCidade(ev.target.value);
                                }}
                            />
                        </div>
                    )}
                    {["funcionario", "medico", "paciente", "endereco"].includes(
                        type
                    ) && (
                        <div className={formStyle.item}>
                            <TextField
                                className={formStyle.item}
                                id="outlined-basic"
                                label="Estado"
                                variant="outlined"
                                value={formEstado}
                                onChange={(ev) => {
                                    setFormEstado(ev.target.value);
                                }}
                            />
                        </div>
                    )}
                    {["funcionario", "medico"].includes(type) && (
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                                className={formStyle.item}
                                disableToolbar
                                variant="outlined"
                                format="dd/MM/yyyy"
                                margin="normal"
                                id="date-picker-inline"
                                label="Data Inicio"
                                value={formDataInicio}
                                onChange={(ev) => {
                                    setFormDataInicio(ev);
                                }}
                            />
                        </MuiPickersUtilsProvider>
                    )}
                    {["funcionario", "medico"].includes(type) && (
                        <div className={formStyle.item}>
                            <TextField
                                className={formStyle.item}
                                id="outlined-basic"
                                label="Salário"
                                variant="outlined"
                                value={formSalario}
                                onChange={(ev) => {
                                    setFormSalario(ev.target.value);
                                }}
                            />
                        </div>
                    )}
                    {["funcionario", "medico"].includes(type) && (
                        <div className={formStyle.item}>
                            <TextField
                                className={formStyle.item}
                                id="outlined-basic"
                                type="password"
                                label="Senha"
                                variant="outlined"
                                value={formSenha}
                                onChange={(ev) => {
                                    setFormSenha(ev.target.value);
                                }}
                            />
                        </div>
                    )}
                    {["funcionario", "medico"].includes(type) && isMedico && (
                        <div className={formStyle.item}>
                            <TextField
                                className={formStyle.item}
                                id="outlined-basic"
                                label="Especialidade"
                                variant="outlined"
                                value={formEspecialidade}
                                onChange={(ev) => {
                                    setFormEspecialidade(ev.target.value);
                                }}
                            />
                        </div>
                    )}
                    {["funcionario", "medico"].includes(type) && isMedico && (
                        <div className={formStyle.item}>
                            <TextField
                                className={formStyle.item}
                                id="outlined-basic"
                                label="CRM"
                                variant="outlined"
                                value={formCrm}
                                onChange={(ev) => {
                                    setFormCrm(ev.target.value);
                                }}
                            />
                        </div>
                    )}
                    {["paciente"].includes(type) && (
                        <div className={formStyle.item}>
                            <TextField
                                className={formStyle.item}
                                id="outlined-basic"
                                label="Peso"
                                variant="outlined"
                                value={formPeso}
                                onChange={(ev) => {
                                    setFormPeso(ev.target.value);
                                }}
                            />
                        </div>
                    )}
                    {["paciente"].includes(type) && (
                        <div className={formStyle.item}>
                            <TextField
                                className={formStyle.item}
                                id="outlined-basic"
                                label="Altura"
                                variant="outlined"
                                value={formAltura}
                                onChange={(ev) => {
                                    setFormAltura(ev.target.value);
                                }}
                            />
                        </div>
                    )}
                    {["paciente"].includes(type) && (
                        <div className={formStyle.item}>
                            <TextField
                                className={formStyle.item}
                                id="outlined-basic"
                                label="Tipo sanguíneo"
                                variant="outlined"
                                value={formTipoSanguineo}
                                onChange={(ev) => {
                                    setFormTipoSanguineo(ev.target.value);
                                }}
                            />
                        </div>
                    )}
                    {["funcionario", "medico"].includes(type) && (
                        <div className={formStyle.item}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={isMedico}
                                        onChange={() =>
                                            handleSetIsMedico(!isMedico)
                                        }
                                        name="checkedB"
                                        color="primary"
                                    />
                                }
                                label="Médico"
                            />
                        </div>
                    )}
                </div>
                <div className={formStyle.buttons}>
                    <Button
                        variant="outlined"
                        style={{ marginRight: "30px" }}
                        onClick={() => {}}
                    >
                        Limpar
                    </Button>
                    <Button variant="outlined" onClick={handleSendClick}>
                        Enviar
                    </Button>
                </div>
            </div>
            <MySnackBar
                open={isOpenSnackBar}
                message={snackBarMessage}
                severity={severitySnackBar}
                setClose={setIsOpenSnackBar}
            />
        </>
    );
};

export default GenericForm;
