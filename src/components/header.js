import { AppBar, Button, makeStyles, Switch, Toolbar } from "@material-ui/core";
import Brightness3Icon from "@material-ui/icons/Brightness3";
import WbSunnyIcon from "@material-ui/icons/WbSunny";
import Image from "next/image";
import Link from "next/link";
import { header } from "../styles";

const Header = ({ theme, darkMode, toggleDarkMode, user }) => {
    const style = {
        appBar: {
            backgroundColor: theme.palette.background.paper,
            marginBottom: "30px",
            position: "relative",
        },
        toolbar: {
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
        },
        buttonsContainer: {
            display: "flex",
            alignItems: "center",
        },

        title: { color: theme.palette.text.primary },
        loginButton: { marginLeft: "auto" },
        link: { cursor: "pointer", zIndex: "2" },
    };

    console.log(user);

    return (
        <AppBar style={style.appBar} position="fixed">
            <Toolbar style={style.toolbar}>
                <Link href="/">
                    <span style={style.link}>
                        <Image src="/assets/logo.svg" height={55} width={100} />
                    </span>
                </Link>
                <span style={style.buttonsContainer}>
                    <Link href="/gallery">
                        <Button style={style.loginButton}>Galeria</Button>
                    </Link>
                    {!user && (
                        <>
                            <Link href="/enderecos">
                                <Button style={style.loginButton}>
                                    Cadastrar Endereco
                                </Button>
                            </Link>
                            <Link href="/consultas">
                                <Button style={style.loginButton}>
                                    Cadastrar consulta
                                </Button>
                            </Link>
                        </>
                    )}
                    {user && (
                        <>
                            <Link href="/funcionarios">
                                <Button style={style.loginButton}>
                                    Funcionários
                                </Button>
                            </Link>
                            <Link href="/pacientes">
                                <Button style={style.loginButton}>
                                    Pacientes
                                </Button>
                            </Link>
                            <Link href="/consultas">
                                <Button style={style.loginButton}>
                                    Consultas
                                </Button>
                            </Link>
                            <Link href="/enderecos">
                                <Button style={style.loginButton}>
                                    Endereços
                                </Button>
                            </Link>
                        </>
                    )}
                    <Link href="/login">
                        <Button style={style.loginButton}>{user ? "Logout" : "Login"}</Button>
                    </Link>
                    <WbSunnyIcon style={style.title} />
                    <Switch
                        checked={darkMode}
                        onChange={() => toggleDarkMode(!darkMode)}
                    />
                    <Brightness3Icon style={style.title} />
                </span>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
